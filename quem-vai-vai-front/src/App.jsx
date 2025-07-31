import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { useEffect } from 'react';
import { attachErrorInterceptor } from './services/api';
import { NotificationProvider, useNotification } from './contexts/NotificationContext';
import { LoadingProvider } from './contexts/LoadingContext';

function AppInitializer() {
  const { showNotification } = useNotification()

  useEffect(() => {
    attachErrorInterceptor(showNotification)
  }, [showNotification])

  return <AppRoutes />
}

function App() {
  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <LoadingProvider>
          <NotificationProvider>
            <AppInitializer />
          </NotificationProvider>
        </LoadingProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  )
}

export default App;
