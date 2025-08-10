import { createContext, useContext, useState, useEffect } from 'react';
import { useLoading } from './LoadingContext';
import authService from '@/services/auth.service';
import Api from '@/services/api';

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const { showLoading, hideLoading } = useLoading()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                // Tentar restaurar sessão
                const hasValidSession = await authService.initialize()

                if (hasValidSession) {
                    // Buscar dados do usuário para confirmar tudo está OK
                    try {
                        console.log("Sessão válida, buscando dados do usuário...")
                        // const response = await Api.get('/user/profile');
                        // if (response.status === 200) {
                        //     setUser(response.data);
                        //     setIsAuthenticated(true);
                        // }
                        setUser({
                            id: 1,
                            name: 'Test User',
                            email: 'test@email.com'
                        })
                        setIsAuthenticated(true)
                    } catch (error) {
                        console.error('Failed to fetch user profile:', error)
                        setIsAuthenticated(false)
                    }
                } else {
                    setIsAuthenticated(false)
                }
            } catch (error) {
                console.error('Auth initialization failed:', error)
                setIsAuthenticated(false)
            } finally {
                setIsLoading(false) // Muito importante: marcar como carregado
            }
        }

        initializeAuth()
        //checkAuthStatus()
    }, []);



    const checkAuthStatus = async () => {
        showLoading()
        try {
            if (authService.isAuthenticated()) {
                console.log("Usuário já autenticado, carregando dados...")
                const response = await Api.get('/user/profile')
                if (response.status === 200) {
                    setUser(response.data)
                    setIsAuthenticated(true)
                }
            }
        } catch (error) {
            console.error('Auth check failed:', error)
            setIsAuthenticated(false)
        } finally {
            hideLoading()
        }
    }

    const login = async (email, password) => {
        console.log("Tentando login com:", email)
        try {
            console.log('Chamando endpoint de login...')
            const response = await Api.post('/auth/login', { email, password })

            if (response.status === 200) {
                authService.setTokens(response.data)
                console.log('Login bem-sucedido, tokens definidos.')
                console.log('Dados do usuário:', response.data)
                setIsAuthenticated(true)

                // Buscar dados do usuário
                // await checkAuthStatus()
                return { success: true }
            }
        } catch (error) {
            const message = error.response?.data?.Error || 'Login failed'
            return { success: false, error: message }
        }

        return { success: false, error: 'Login failed' }
    }

    const logout = async () => {
        try {
            await Api.post('/auth/logout')
        } catch (error) {
            console.error('Logout error:', error)
        }

        authService.clearTokens()
        setIsAuthenticated(false)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{
            isLoading,
            isAuthenticated,
            user,
            login,
            logout,
            authService
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}