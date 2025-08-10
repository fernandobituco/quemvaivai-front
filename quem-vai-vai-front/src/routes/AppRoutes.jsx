import { Routes, Route } from 'react-router-dom';
import Login from '../pages/login';
import AccountConfirmation from '../pages/AccountConfirmation';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';
import MainPage from '@/pages/MainPage';
import ProtectedLayout from './ProtectedLayout';
import InDevelopment from '@/pages/InDevelopment';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<Login />} />
      <Route path="/account-confirmation" element={<MainPage />} />
      {/* <Route path="/main" element={<MainPage />} /> */}
      {/* Rota coringa: 404 */}
      <Route path="*" element={<NotFound />} />
      {/* Rotas protegidas */}
      <Route element={
        <ProtectedRoute>
          <ProtectedLayout />
        </ProtectedRoute>
      } >
        <Route path="/groups" element={<InDevelopment />} />
        <Route path="/events" element={<InDevelopment />} />
        <Route path="/tasks" element={<InDevelopment />} />
      </Route>
    </Routes>
  )
}
