export interface User {
  id: string;
  fullName: string;
  email: string;
  dateOfBirth: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface SignupData {
  fullName: string;
  email: string;
  dateOfBirth: string;
  otp: string;
}

export interface SigninData {
  email: string;
  otp: string;
}