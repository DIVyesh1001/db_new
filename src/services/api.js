import axios from 'axios';

// Use public IP from environment variable
const API_URL = import.meta.env.VITE_API_URL || 'http://13.232.138.232:8000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

