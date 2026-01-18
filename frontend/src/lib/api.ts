import axios from 'axios';
import Cookies from 'js-cookie';

// For GitHub Codespaces - always use localhost:3001
const API_BASE_URL = 'http://localhost:3001';

console.log('🔧 API Base URL for Codespaces:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 30000, // Increased timeout for Codespaces
  withCredentials: false, // Disable for Codespaces CORS simplicity
});

// Add request logging
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`, {
      baseURL: config.baseURL,
    });
    
    const token = Cookies.get('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔑 Adding Authorization header');
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error.message);
    return Promise.reject(error);
  }
);

// Add response logging
api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      message: error.message,
      url: error.config?.url,
      status: error.response?.status,
    });

    if (error.code === 'ECONNABORTED') {
      console.error('⏰ Request timeout');
    } else if (!error.response) {
      console.error('🌐 Network error - check if backend is running on port 3001');
    }

    if (error.response?.status === 401) {
      Cookies.remove('access_token');
      Cookies.remove('user');
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/signin';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;