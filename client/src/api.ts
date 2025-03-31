import axios from 'axios';
import { ACCESS_TOKEN } from './constants';

// Base API configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - token expired or invalid
      localStorage.removeItem(ACCESS_TOKEN);
      // Optionally redirect to login page
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  login: async (username: string, password: string) => {
    const response = await api.post('/api/token/', { username, password });
    return response.data;
  },
  refreshToken: async (refreshToken: string) => {
    const response = await api.post('/api/token/refresh/', { refresh: refreshToken });
    return response.data;
  },
  register: async (username: string, password: string) => {
    const response = await api.post('/api/register/', { username, password });
    return response.data;
  }
};

// Experience API endpoints (Firebase)
export const experienceAPI = {
  getAll: async () => {
    const response = await api.get('/api/experiences/');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/api/experiences/${id}/`);
    return response.data;
  },
  create: async (experienceData: any) => {
    const response = await api.post('/api/experiences/create/', experienceData);
    return response.data;
  },
  update: async (id: string, experienceData: any) => {
    const response = await api.put(`/api/experiences/update/${id}/`, experienceData);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/api/experiences/delete/${id}/`);
    return response.data;
  }
};

// Project API endpoints (Firebase)
export const projectAPI = {
  getAll: async () => {
    const response = await api.get('/api/projects/');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/api/projects/${id}/`);
    return response.data;
  },
  create: async (projectData: any) => {
    const response = await api.post('/api/projects/create/', projectData);
    return response.data;
  },
  update: async (id: string, projectData: any) => {
    const response = await api.put(`/api/projects/update/${id}/`, projectData);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/api/projects/delete/${id}/`);
    return response.data;
  }
};

// Define types for project and experience data
export interface ProjectData {
  id?: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string[];
  created_at?: Date;
  updated_at?: Date;
}

export interface ExperienceData {
  id?: string;
  title: string;
  company: string;
  duration: string;
  description: string[];
  technologies: string[];
  image: string;
  created_at?: Date;
  updated_at?: Date;
}

export default api;