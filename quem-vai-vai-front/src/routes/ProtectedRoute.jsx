import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh' 
            }}>
                <div>Verificando autenticação...</div>
            </div>
        )
    }

    if (!isAuthenticated) {
        console.log("Usuário não autenticado, redirecionando para login...")
        return <Navigate to="/" replace />
    }

    return children;
}

export default ProtectedRoute