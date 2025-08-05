import { Routes, Route } from 'react-router-dom';
import Login from '../pages/login';
import AccountConfirmation from '../pages/AccountConfirmation';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/account-confirmation" element={<AccountConfirmation />} />
      {/* Rota coringa: 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
