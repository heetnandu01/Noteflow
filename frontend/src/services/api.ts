import axios from "axios";
import type { SigninData, SignupData } from "../types";


const API_BASE_URl = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URl,
    withCredentials: true, // Enable cookies for cross-origin requests 
    headers: {
        'Content-Type': 'application/json',
    }
})

api.interceptors.request.use((config) => {
    return config;
}, (error) => {
    return Promise.reject(error);
})

api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error);
});


export const authAPI = {
    sendSignupOtp: (data: { email: string, fullName: string, dateOfBirth: string }) =>
        api.post('/auth/signup/send-otp', data),

    verifySignupOtp: (data: SignupData) =>
        api.post('/auth/signup/verify-otp', data),

    sendSigninOtp: (data: { email: string }) =>
        api.post('/auth/signin/send-otp', data),

    verifySigninOtp: (data: SigninData) =>
        api.post('/auth/signin/verify-otp', data),

    logout: () =>
        api.post('/auth/logout'),

    getProfile: () =>
        api.post('/auth/profile'),
}

export const notesAPI = {
  getNotes: () =>
    api.get('/notes'),

  createNote: (data: { title: string; content: string }) =>
    api.post('/notes', data),

  updateNote: (id: string, data: { title: string; content: string }) =>
    api.put(`/notes/${id}`, data),

  deleteNote: (id: string) =>
    api.delete(`/notes/${id}`),
};

export default api;
