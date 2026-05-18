import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, CreditCard, TrendingUp, PieChart, Settings } from "lucide-react";

export const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: Home, path: "/" },
    { name: "Cards", icon: CreditCard, path: "/cards" },
    { name: "Transactions", icon: TrendingUp, path: "/transactions" },
    { name: "Budget", icon: PieChart, path: "/budget" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

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
