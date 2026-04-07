import axios from 'axios';

// Create an instance of axios with some default configuration
export const apiClient = axios.create({
  baseURL: 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
});