import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useLoading } from './LoadingContext';
import authService from '@/services/auth.service';
import * as userService from '@/services/user.service';
import Api from '@/services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext()

export function AuthProvider({ children }) {
    // Estado unificado para evitar inconsistências
    const [authState, setAuthState] = useState({
        isInitialized: false,
        isAuthenticated: false,
        user: null,
        error: null
    })

    // Loading específico para operações auth (não conflita com global)
    const [authLoading, setAuthLoading] = useState({
        initializing: true,
        login: false,
        logout: false,
        updating: false,
        deleting: false
    })

    const { showLoading, hideLoading } = useLoading()
    const navigate = useNavigate()

    // Helper para atualizar loading específico
    const updateAuthLoading = useCallback((key, value) => {
        setAuthLoading(prev => ({ ...prev, [key]: value }))
    }, [])

    // Inicialização única e otimizada
    useEffect(() => {
        let isMounted = true

        const initializeAuth = async () => {
            try {
                updateAuthLoading('initializing', true)

                // 1. Verificar se há sessão válida
                const hasValidSession = await authService.initialize()

                if (!isMounted) return

                if (hasValidSession) {
                    // 2. Buscar dados do usuário apenas se sessão é válida
                    try {
                        const response = await userService.getProfile()

                        if (!isMounted) return

                        if (response.StatusCode === 200 && response.Data) {
                            setAuthState({
                                isInitialized: true,
                                isAuthenticated: true,
                                user: {
                                    id: response.Data.Id,
                                    name: response.Data.Name,
                                    email: response.Data.Email
                                },
                                error: null
                            })
                        } else {
                            // Sessão inválida - limpar tokens
                            authService.clearTokens()
                            setAuthState({
                                isInitialized: true,
                                isAuthenticated: false,
                                user: null,
                                error: null
                            })
                        }
                    } catch (error) {
                        if (!isMounted) return

                        // Erro ao buscar perfil - limpar sessão
                        authService.clearTokens()
                        setAuthState({
                            isInitialized: true,
                            isAuthenticated: false,
                            user: null,
                            error: 'Erro ao restaurar sessão'
                        })
                    }
                } else {
                    // Sem sessão válida
                    if (!isMounted) return

                    setAuthState({
                        isInitialized: true,
                        isAuthenticated: false,
                        user: null,
                        error: null
                    })
                }
            } catch (error) {
                if (!isMounted) return

                setAuthState({
                    isInitialized: true,
                    isAuthenticated: false,
                    user: null,
                    error: 'Erro na inicialização'
                })
            } finally {
                if (isMounted) {
                    updateAuthLoading('initializing', false)
                }
            }
        }

        initializeAuth()

        return () => {
            isMounted = false
        }
    }, [updateAuthLoading])

    // Login otimizado
    const login = useCallback(async (email, password) => {
        try {
            updateAuthLoading('login', true)

            const response = await authService.Login(email, password)

            if (response.StatusCode === 200) {
                // 1. Configurar tokens
                authService.setTokens(response)

                // 2. Buscar dados do usuário
                const profileResponse = await userService.getProfile()

                if (profileResponse.StatusCode === 200 && profileResponse.Data) {
                    setAuthState({
                        isInitialized: true,
                        isAuthenticated: true,
                        user: {
                            id: profileResponse.Data.Id,
                            name: profileResponse.Data.Name,
                            email: profileResponse.Data.Email
                        },
                        error: null
                    })
                    return { success: true }
                } else {
                    // Falhou ao buscar perfil após login - limpar tokens
                    authService.clearTokens()
                    return { success: false, error: 'Erro ao buscar dados do usuário' }
                }
            }

            return { success: false, error: 'Credenciais inválidas' }
        } catch (error) {
            const message = error.response?.data?.Error || 'Login falhou'
            return { success: false, error: message }
        } finally {
            updateAuthLoading('login', false)
        }
    }, [updateAuthLoading])

    // Logout otimizado
    const logout = useCallback(async (navigateToHome = true) => {
        try {
            updateAuthLoading('logout', true)

            // Tentar fazer logout no servidor (não bloqueia se falhar)
            try {
                await Api.post('/auth/logout')
            } catch (error) {
                console.warn('Erro ao fazer logout no servidor:', error)
            }

            // Limpar estado local
            authService.clearTokens()
            setAuthState({
                isInitialized: true,
                isAuthenticated: false,
                user: null,
                error: null
            })

            // Navegação opcional
            if (navigateToHome) {
                navigate('/')
            }
        } finally {
            updateAuthLoading('logout', false)
        }
    }, [navigate, updateAuthLoading])

    // Refresh de dados otimizado
    const refreshUserData = useCallback(async (showGlobalLoading = false) => {
        try {
            if (showGlobalLoading) {
                showLoading()
            }

            // 1. Verificar se precisa de refresh de token
            if (authService.isTokenExpiringSoon()) {
                const refreshSuccess = await authService.refreshTokenSilently()

                if (!refreshSuccess) {
                    // Token não pode ser renovado - fazer logout
                    await logout(false) // Não navegar automaticamente
                    return { success: false, error: 'Sessão expirada', requiresLogin: true }
                }
            }

            // 2. Buscar dados atualizados
            const response = await userService.getProfile()

            if (response.StatusCode === 200 && response.Data) {
                setAuthState(prev => ({
                    ...prev,
                    user: {
                        id: response.Data.Id,
                        name: response.Data.Name,
                        email: response.Data.Email
                    },
                    error: null
                }))
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
    }, [showLoading, hideLoading, logout])

    // Update profile otimizado
    const updateUserProfile = useCallback(async (userData) => {
        try {
            updateAuthLoading('updating', true)

            const response = await userService.updateUser(userData)

            if (response.StatusCode === 200) {
                // Se a API retorna os dados atualizados, usar eles
                if (response.Data) {
                    setAuthState(prev => ({
                        ...prev,
                        user: {
                            id: response.Data.Id,
                            name: response.Data.Name,
                            email: response.Data.Email
                        }
                    }))
                    return { success: true }
                } else {
                    // Caso contrário, buscar dados atualizados
                    const refreshResult = await refreshUserData(false)
                    return refreshResult
                }
            } else {
                return { success: false, error: 'Erro ao atualizar perfil' }
            }
        } catch (error) {
            const message = error.response?.data?.Error || 'Erro ao atualizar perfil'
            return { success: false, error: message }
        } finally {
            updateAuthLoading('updating', false)
        }
    }, [refreshUserData, updateAuthLoading])

    // Delete user otimizado
    const deleteUser = useCallback(async (id) => {
        try {
            updateAuthLoading('deleting', true)

            const response = await userService.deleteUser(id)

            if (response.StatusCode === 200) {
                // Limpar estado e navegar
                authService.clearTokens()
                setAuthState({
                    isInitialized: true,
                    isAuthenticated: false,
                    user: null,
                    error: null
                })
                navigate('/')
                return { success: true }
            } else {
                return { success: false, error: 'Erro ao excluir usuário' }
            }
        } catch (error) {
            const message = error.response?.data?.Error || 'Erro ao excluir usuário'
            return { success: false, error: message }
        } finally {
            updateAuthLoading('deleting', false)
        }
    }, [navigate, updateAuthLoading])

    // Memoizar o valor do contexto para evitar re-renders desnecessários
    const contextValue = useMemo(() => ({
        // Estados
        isLoading: authLoading.initializing,
        isAuthenticated: authState.isAuthenticated,
        isInitialized: authState.isInitialized,
        user: authState.user,
        error: authState.error,

        // Loading específicos
        loadingStates: authLoading,

        // Ações
        login,
        logout,
        refreshUserData,
        updateUserProfile,
        deleteUser,

        // Utilitários
        clearError: () => setAuthState(prev => ({ ...prev, error: null })),
        authService, // Expor para casos específicos
    }), [
        authState,
        authLoading,
        login,
        logout,
        refreshUserData,
        updateUserProfile,
        deleteUser
    ])

    return (
        <AuthContext.Provider value={contextValue}>
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