import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://lunarsenterprises.com:6030/api',
  timeout: 10000,
});

// Add Authorization Token
api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Handle global responses and errors
api.interceptors.response.use(
  response => {
    console.log('API Response:', response.data);  // ✅ Log the response
    return response.data; // ✅ Return only the data part
  },
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
