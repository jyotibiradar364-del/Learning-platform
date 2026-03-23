import axios from 'axios';

// Get the base URL from env or fallback to localhost
const baseEnvUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Robust normalization: ensure it ends with /api and has no trailing slashes
const API_URL = baseEnvUrl.replace(/\/+$/, '').endsWith('/api') 
  ? baseEnvUrl.replace(/\/+$/, '') 
  : `${baseEnvUrl.replace(/\/+$/, '')}/api`;

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token refresh
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If we get a 401 and haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Use instance to ensure we use valid baseURL and withCredentials
        const res = await axios.post(`${API_URL}/auth/refresh`, {}, { withCredentials: true });
        const { accessToken } = res.data;
        
        localStorage.setItem('accessToken', accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        
        return instance(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear token and handle logout
        localStorage.removeItem('accessToken');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
