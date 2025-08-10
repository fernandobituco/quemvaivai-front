import axios from "axios"

const NoInterceptorApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
    },
    skipAuthInterceptor: true
})

export default NoInterceptorApi