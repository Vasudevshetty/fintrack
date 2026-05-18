import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, CreditCard, TrendingUp, PieChart, Settings, Zap } from "lucide-react";

export const Sidebar = ({ isOpen, onClose, neon = false }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: Home, path: "/" },
    { name: "Cards", icon: CreditCard, path: "/cards" },
    { name: "Transactions", icon: TrendingUp, path: "/transactions" },
    { name: "Budget", icon: PieChart, path: "/budget" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  if (neon) {
    return (
      <>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm md:hidden z-40"
            onClick={onClose}
          />
        )}
        <aside
          className={`fixed md:static w-64 h-screen z-50 transform transition-transform border-r border-cyan-500/20 bg-neon-panel/95 backdrop-blur-xl ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <div className="p-6 border-b border-cyan-500/20">
            <div className="flex items-center gap-2">
              <Zap className="text-neon-cyan" size={28} />
              <h2 className="font-display text-xl font-bold tracking-wider">
                <span className="text-neon-cyan">FIN</span>
                <span className="text-neon-magenta">GRID</span>
              </h2>
            </div>
            <p className="text-xs text-neon-muted mt-2 font-mono">NEON DEV BUILD</p>
          </div>

          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive
                      ? "bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/40 shadow-neon"
                      : "text-neon-muted hover:text-neon-text hover:bg-neon-cyan/5 border border-transparent"
                  }`}
                  onClick={onClose}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </aside>
      </>
    );
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed md:static w-64 h-screen bg-gray-900 text-white p-6 transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-40`}
      >
        <div className="mb-8">
          <h2 className="text-2xl font-bold">FinTrack</h2>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
                onClick={onClose}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
