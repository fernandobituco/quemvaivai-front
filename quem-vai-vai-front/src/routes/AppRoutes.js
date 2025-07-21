import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* Adicione outras rotas aqui futuramente */}
    </Routes>
  );
}
