import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { useEffect } from 'react';
import { attachInterceptors } from './services/interceptor';
import { NotificationProvider, useNotification } from './contexts/NotificationContext';
import { LoadingProvider } from './contexts/LoadingContext';
import { useTranslation } from 'react-i18next';
import Api from './services/api';
import { AuthProvider } from './contexts/AuthContext';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

function AppInitializer() {
  const { showNotification } = useNotification()
  const { t } = useTranslation()

  useEffect(() => {
    attachInterceptors(Api, showNotification, t)
  }, [showNotification])

  return <AppRoutes />
}

function App() {
  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <LoadingProvider>
          <NotificationProvider>
            <AuthProvider>
              <AppInitializer />
              <Analytics />
              <SpeedInsights />
            </AuthProvider>
          </NotificationProvider>
        </LoadingProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  )
}

export default App;
