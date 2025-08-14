import Api from "./api"
import NoInterceptorApi from "./nointerceptorapi"

class AuthService {
    constructor() {
        this.accessToken = null
        this.tokenExpiryTime = null
        this.isRefreshing = false
        this.refreshPromise = null
        this.initializationPromise = null;
    }

    async initialize() {
        if (this.initializationPromise) {
            return this.initializationPromise
        }

        this.initializationPromise = this.performInitialization()
        return this.initializationPromise
    }

    async performInitialization() {
        try {
            // Tentar fazer refresh para verificar se usuário está logado
            const response = await NoInterceptorApi.post('/auth/refresh', {})
            if (response.status === 200) {
                this.setTokens(response.data)
                return true; // Usuário está autenticado
            } else {
                console.error('else Failed to initialize auth:', error)
                return false; // Não há sessão válida
            }
        } catch (error) {
            console.error('catch Failed to initialize auth:', error)
            return false
        }
    }

    // Endpoints que NÃO precisam de autenticação
    isPublicEndpoint(url) {
        const publicEndpoints = [
            '/auth/login',
            '/auth/register',
            '/auth/confirm-account',
            '/auth/forgot-password',
            '/auth/reset-password',
            '/auth/refresh', // Importante: refresh não deve ter Authorization header
            '/auth/force-refresh'
        ];

        return publicEndpoints.some(endpoint => url.includes(endpoint))
    }

    setTokens(tokenData) {
        if (!tokenData || !tokenData.IsSuccess) {
            this.clearTokens()
            return
        }
        this.accessToken = tokenData.Data.AccessToken
        this.tokenExpiryTime = new Date(tokenData.Data.AccessTokenExpiry)
    }

    isAuthenticated() {
        return this.accessToken && !this.isTokenExpired()
    }

    isTokenExpired() {
        if (!this.tokenExpiryTime) return true
        return Date.now() >= this.tokenExpiryTime.getTime()
    }

    isTokenExpiringSoon() {
        if (!this.tokenExpiryTime) return true
        // Considera "expirando" se resta menos de 5 minutos
        return (this.tokenExpiryTime.getTime() - Date.now()) < 5 * 60 * 1000
    }

    async refreshTokenSilently() {
        // Evita múltiplos refresh simultâneos
        if (this.refreshPromise) {
            return this.refreshPromise
        }

        if (this.isRefreshing) {
            // Aguarda o refresh em andamento
            return new Promise((resolve) => {
                const checkRefresh = () => {
                    if (!this.isRefreshing) {
                        resolve(this.accessToken !== null)
                    } else {
                        setTimeout(checkRefresh, 100)
                    }
                }
                checkRefresh()
            })
        }

        this.isRefreshing = true
        this.refreshPromise = this.performRefresh()

        try {
            const result = await this.refreshPromise
            return result
        } finally {
            this.isRefreshing = false
            this.refreshPromise = null
        }
    }

    async forceRefreshToken() {
        try {
            console.log('Forçando refresh do token após atualização de dados...')

            const response = await NoInterceptorApi.post('/auth/force-refresh', {})

            if (response.status === 200) {
                this.setTokens(response.data)
                console.log('Token atualizado com sucesso')
                return true
            } else {
                console.error('Erro ao fazer force refresh:', response)
                this.clearTokens()
                return false
            }
        } catch (error) {
            console.error('Force refresh failed:', error)
            this.clearTokens()
            return false
        }
    }

    async performRefresh() {
        try {
            const response = await NoInterceptorApi.post('/auth/refresh', {})

            if (response.status === 200) {
                this.setTokens(response.data)
                return true
            } else {
                this.clearTokens()
                return false
            }
        } catch (error) {
            console.error('Token refresh failed:', error)
            this.clearTokens()
            return false
        }
    }

    clearTokens() {
        this.accessToken = null
        this.tokenExpiryTime = null
    }

    logout() {
        this.clearTokens()
        // Redirecionar para login ou emitir evento
        window.location.href = '/'
    }

     async Login(email, password) {
        const response = await Api.post('auth/login', { email, password })
        return response.data
    }
}

// Instância singleton
const authService = new AuthService()
export default authService