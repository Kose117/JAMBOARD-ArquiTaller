import axios from 'axios';

export const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

axiosApi.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
);

axiosApi.interceptors.response.use(
  response => response,
  error => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);
