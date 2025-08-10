import NavigationBar from '@/components/Navbar';
import { Outlet } from 'react-router-dom';

const ProtectedLayout = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw" }}>
      <NavigationBar />
      <main style={{ height: "calc(100vh - 64px)" }}>
        <div className="max-w-7xl mx-auto p-6" style={{ height: "100%" }}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default ProtectedLayout