import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://turbo-zebra-946g554gq693pq46-3001.app.github.dev';

console.log('🔧 API Base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 15000,
  withCredentials: true, // Important for cookies and CORS
});

// Add request logging
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`, {
      baseURL: config.baseURL,
      headers: config.headers,
    });
    
    const token = Cookies.get('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔑 Adding Authorization header with token');
    } else {
      console.log('⚠️ No access token found in cookies');
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Add response logging
api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}`, {
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      message: error.message,
      code: error.code,
      url: error.config?.url,
      method: error.config?.method,
      baseURL: error.config?.baseURL,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers,
    });

    // Handle network errors
    if (error.code === 'ECONNABORTED') {
      console.error('⏰ Request timeout');
    } else if (!error.response) {
      console.error('🌐 Network error - backend may be down or CORS issue');
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
