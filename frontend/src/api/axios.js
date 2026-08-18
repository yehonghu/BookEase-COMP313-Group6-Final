/**
 * @module api/axios
 * @description Axios instance configuration with base URL and interceptors.
 */

import axios from 'axios';

const configuredBaseURL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || '/api';
const usesHashRouter = import.meta.env.VITE_ROUTER_MODE === 'hash';

const API = axios.create({
  baseURL: configuredBaseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - attach token and handle FormData
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('bookease_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Let browser set Content-Type for FormData (includes boundary)
    if (typeof FormData !== 'undefined' && config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('bookease_token');
      localStorage.removeItem('bookease_user');
      if (usesHashRouter) {
        window.location.hash = '#/login';
      } else if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;
