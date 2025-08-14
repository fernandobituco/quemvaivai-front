import { createContext, useContext, useState, useEffect } from 'react';
import { useLoading } from './LoadingContext';
import authService from '@/services/auth.service';
import * as userService from '@/services/user.service';
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
                        const response = await userService.getProfile()
                        if (response.status === 200 && response.data && response.data.Data) {
                            setUser({
                                id: response.data.Data.Id,
                                name: response.data.Data.Name,
                                email: response.data.Data.Email
                            })
                            setIsAuthenticated(true);
                        } else {
                            setIsAuthenticated(false);
                        }
                    } catch (error) {
                        setIsAuthenticated(false)
                    }
                } else {
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
                const response = await userService.getProfile()
                if (response.status === 200 && response.data && response.data.Data) {
                    setUser({
                        id: response.data.Data.Id,
                        name: response.data.Data.Name,
                        email: response.data.Data.Email
                    })
                    console.log("Usuário autenticado:", response.data.Data)
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
            const response = await authService.Login(email, password)

            if (response.StatusCode === 200) {
                authService.setTokens(response)
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

    const refreshUserData = async () => {
        console.log("Atualizando dados do usuário...")
        try {
            showLoading()

            // 1. Fazer refresh FORÇADO do token para garantir dados atualizados
            const refreshSuccess = await authService.forceRefreshToken()

            if (!refreshSuccess) {
                // Se não conseguiu fazer refresh, fazer logout
                await logout()
                return { success: false, error: 'Sessão expirada' }
            }

            // 2. Buscar dados atualizados do usuário
            const response = await userService.getProfile()

            if (response.StatusCode === 200 && response.Data) {
                setUser({
                    id: response.Data.Id,
                    name: response.Data.Name,
                    email: response.Data.Email
                })
                return { success: true }
            } else {
                return { success: false, error: 'Erro ao buscar dados do usuário' }
            }
        } catch (error) {
            console.error('Erro ao atualizar dados do usuário:', error)
            return { success: false, error: 'Erro ao atualizar dados' }
        } finally {
            hideLoading()
        }
    }

    const updateUserProfile = async (userData) => {
        try {
            showLoading()

            // 1. Chamar API para atualizar dados
            const response = await userService.updateUser(userData)
            console.log("Resposta da atualização:", response)
            if (response.StatusCode === 200) {
                // 2. Atualizar dados locais após sucesso
                console.log("Dados do usuário atualizados:", response.Data)
                const refreshResult = await refreshUserData()
                return refreshResult
            } else {
                return { success: false, error: 'Erro ao atualizar perfil' }
            }
        } catch (error) {
            const message = error.response?.data?.Error || 'Erro ao atualizar perfil'
            return { success: false, error: message }
        } finally {
            hideLoading()
        }
    }

    const deleteUser = async (id) => {
        try {
            showLoading()
            const response = await userService.deleteUser(id)

            if (response.StatusCode === 200) {
                authService.clearTokens()
                setIsAuthenticated(false)
                setUser(null)
                navigate('/')
                return { success: true }
            } else {
                return { success: false, error: 'Erro ao excluir usuário' }
            }
        }
        catch (error) {
            const message = error.response?.data?.Error || 'Erro ao excluir usuário'
            return { success: false, error: message }
        } finally {
            hideLoading()
        }
    }

    return (
        <AuthContext.Provider value={{
            isLoading,
            isAuthenticated,
            user,
            login,
            logout,
            authService,
            updateUserProfile,
            deleteUser
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