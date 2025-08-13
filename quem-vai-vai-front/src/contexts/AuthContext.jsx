import { createContext, useContext, useState, useEffect } from 'react';
import { useLoading } from './LoadingContext';
import authService from '@/services/auth.service';
import Api from '@/services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const { showLoading, hideLoading } = useLoading()
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const initializeAuth = async () => {

            showLoading()
            try {
                // Tentar restaurar sessão
                const hasValidSession = await authService.initialize()

                if (hasValidSession) {
                    // Buscar dados do usuário para confirmar tudo está OK
                    try {
                        const response = await Api.get('/users/profile');
                        if (response.status === 200 && response.data && response.data.Data) {
                            setUser({
                                id: response.data.Data.Id,
                                name: response.data.Data.Name,
                                email: response.data.Data.Email
                            })
                            console.log('User data loaded:', response.data.Data)
                            setIsAuthenticated(true);
                        } else {
                            setIsAuthenticated(false);
                        }
                    } catch (error) {
                        setIsAuthenticated(false)
                    }
                } else {
                    console.warn('No valid session found')
                    setIsAuthenticated(false)
                }
            } catch (error) {
                setIsAuthenticated(false)
            } finally {
                hideLoading()
                setIsLoading(false) // Muito importante: marcar como carregado
            }
        }

        initializeAuth()
        checkAuthStatus()
    }, []);

    const checkAuthStatus = async () => {
        showLoading()
        try {
            if (authService.isAuthenticated()) {
                const response = await Api.get('/users/profile')
                if (response.status === 200 && response.data && response.data.Data) {
                    setUser({
                        id: response.data.Data.Id,
                        name: response.data.Data.Name,
                        email: response.data.Data.Email
                    })
                    console.log('User data loaded:', response.data.Data)
                    setIsAuthenticated(true)
                }
            }
        } catch (error) {
            setIsAuthenticated(false)
        } finally {
            hideLoading()
        }
    }

    const login = async (email, password) => {
        try {
            const response = await Api.post('/auth/login', { email, password })

            if (response.status === 200) {
                authService.setTokens(response.data)
                setIsAuthenticated(true)

                // Buscar dados do usuário
                await checkAuthStatus()
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
        }

        authService.clearTokens()
        setIsAuthenticated(false)
        setUser(null)
        navigate('/')
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