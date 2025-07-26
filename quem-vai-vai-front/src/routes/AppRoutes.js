import { Routes, Route } from 'react-router-dom';
import Login from '../pages/loginold'
import AuthPage from '../pages/loginnew';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/old" element={<Login />} />
      {/* Adicione outras rotas aqui futuramente */}
    </Routes>
  );
}
