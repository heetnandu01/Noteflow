import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { User, AuthState } from '../types';
import { authAPI } from '../services/api';
import { AxiosError } from 'axios';

interface AuthContextType extends AuthState {
  login: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: 'LOGIN', payload: user });
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      const error = err as AxiosError;
      console.error('Logout error:', error.message);
    } finally {
      localStorage.removeItem('user');
      dispatch({ type: 'LOGOUT' });
    }
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  // Check for existing session on app load
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const response = await authAPI.getProfile();
        dispatch({ type: 'LOGIN', payload: response.data.user });
      } catch (err) {
        const error = err as AxiosError;
        if (error.response?.status !== 401) {
          console.error('Auth check failed:', error.message);
        }
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

