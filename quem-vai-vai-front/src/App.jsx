import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { useEffect } from 'react';
import { attachErrorInterceptor } from './services/api';
import { NotificationProvider, useNotification } from './contexts/NotificationContext';
import { LoadingProvider } from './contexts/LoadingContext';
import { useTranslation } from 'react-i18next';

function AppInitializer() {
  const { showNotification } = useNotification()
  const { t } = useTranslation()

  useEffect(() => {
    attachErrorInterceptor(showNotification, t)
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
