import axios from 'axios';

const Api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Interceptador de resposta para tratar erros
export const attachErrorInterceptor = (showNotification, t) => {
    Api.interceptors.response.use(
        response => response,
        error => {
            const message =
                error.response?.data?.Error ||
                t('server.comunication.error');

            showNotification(message);
            return Promise.reject(error)
        }
    )
}

export default Api