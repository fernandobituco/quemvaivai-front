import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading } = useAuth()
    const { t } = useTranslation()

    if (isLoading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh' 
            }}>
                <div>{t('verifying.authentication')}</div>
            </div>
        )
    }

    if (!isAuthenticated) {
        console.log("não autenticado")
        return <Navigate to="/" replace />
    }

    return children
}

export default ProtectedRoute