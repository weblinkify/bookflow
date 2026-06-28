import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/auth.js';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import { ProtectedRoute } from './components/ProtectedRoute';
import MyBookings from './pages/MyBookings.js';
import Sidebar from './components/Sidebar.js';
import AiChatPanel from './components/AiChatPanel.js';
import Employees from './pages/Employees.js';

export default function App() {
  const { user } = useAuthStore();

  return (
    <>
      <div className="flex h-screen bg-gray-950 text-white">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <main className="flex-1 overflow-y-auto p-6">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/book" element={<Booking />} />
              <Route path="/my-bookings" element={<MyBookings />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* 404 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            {/* AI CHAT OVERLAY */}
            <AiChatPanel />
          </main>
        </div>
      </div>
    </>
  );
}
