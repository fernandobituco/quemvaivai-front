import authService from "./auth.service";

export const attachInterceptors = (Api, showNotification, t) => {
    // Interceptador de REQUISIÇÃO
    Api.interceptors.request.use(
        async (config) => {
            if (config.skipAuthInterceptor || authService.isPublicEndpoint(config.url)) {
                return config
            }
            // Verificar se token está expirando
            if (authService.isTokenExpiringSoon()) {
                await authService.refreshTokenSilently()
            }
            // Adicionar token se disponível
            if (authService.accessToken) {
                config.headers.Authorization = `Bearer ${authService.accessToken}`
            }
            return config
        },
        (error) => Promise.reject(error)
    )


    // Interceptador de resposta para tratar erros
    Api.interceptors.response.use(
        response => response,
        async error => {
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true
                try {
                    const refreshed = await authService.refreshTokenSilently()
                    if (refreshed) {
                        // Atualizar header da requisição original
                        originalRequest.headers.Authorization = `Bearer ${authService.accessToken}`
                        return Api(originalRequest)
                    } else {
                        // Refresh falhou, fazer logout
                        authService.logout()
                        return Promise.reject(error)
                    }
                } catch (err) {
                    authService.logout()
                    return Promise.reject(err)
                }
            }
            if (error.response?.status !== 401) {
                const message =
                    error.response?.data?.Error ||
                    t('server.comunication.error')
                showNotification(message)
                return Promise.reject(error)
            }
        }
    )
}