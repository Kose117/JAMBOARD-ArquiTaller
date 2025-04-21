import axios from 'axios';

export const authApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
});

authApi.interceptors.request.use(
    config => config,
    error => Promise.reject(error)
);

authApi.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response &&
            error.response.status === 401 &&
            originalRequest.url !== '/auth/refresh' &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            try {
                await authApi.post('/auth/refresh');

                return authApi(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        if (error.response && error.response.status !== 401) {
            console.error('API Error:', error);
        }

        return Promise.reject(error);
    }
);
