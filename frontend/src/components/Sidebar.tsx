import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.js";
import {
  Menu,
  X,
  LogOut,
  LogIn,
  Calendar,
  LayoutDashboard,
  BookOpen,
  User,
  Shield,
} from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div
      className={`h-screen bg-gray-950 text-white border-r border-gray-800 flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        {!collapsed && (
          <div className="text-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            📅 BookFlow
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-gray-800 rounded-lg"
        >
          {collapsed ? <Menu size={18} /> : <X size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-3 space-y-1">
        <NavItem
          to="/"
          icon={<LayoutDashboard size={18} />}
          label="Home"
          collapsed={collapsed}
        />

        <NavItem
          to="/book"
          icon={<BookOpen size={18} />}
          label="Book Now"
          collapsed={collapsed}
        />

        <NavItem
          to="/my-bookings"
          icon={<Calendar size={18} />}
          label="My Bookings"
          collapsed={collapsed}
        />

        <NavItem
          to="/employees"
          icon={<User size={18} />}
          label="Employees"
          collapsed={collapsed}
        />

        {user && (
          <NavItem
            to="/dashboard"
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            collapsed={collapsed}
          />
        )}

        {user?.role === "admin" && (
          <NavItem
            to="/admin"
            icon={<Shield size={18} />}
            label="Admin"
            collapsed={collapsed}
          />
        )}
      </div>

      {/* Footer / User section */}
      <div className="p-3 border-t border-gray-800 space-y-3">
        {user ? (
          <>
            <div
              className={`flex items-center gap-2 ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm">
                {user.name?.[0]}
              </div>

              {!collapsed && (
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">{user.name}</span>
                  <span className="text-xs text-gray-400 capitalize">
                    {user.role}
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={handleLogout}
              className={`flex items-center gap-2 w-full bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg text-sm ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <LogOut size={16} />
              {!collapsed && "Logout"}
            </button>
          </>
        ) : (
          <div className="space-y-2">
            <NavItem
              to="/login"
              icon={<LogIn size={18} />}
              label="Login"
              collapsed={collapsed}
            />

            <NavItem
              to="/register"
              icon={<User size={18} />}
              label="Sign Up"
              collapsed={collapsed}
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------ NAV ITEM COMPONENT ------------------ */

function NavItem({
  to,
  icon,
  label,
  collapsed,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition"
    >
      {icon}
      {!collapsed && <span className="text-sm">{label}</span>}
    </Link>
  );
}
