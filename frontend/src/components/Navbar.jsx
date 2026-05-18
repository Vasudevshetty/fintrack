import React from "react";
import { LogOut, User, Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = ({ user, onLogout, envConfig, neon = false }) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    onLogout();
    navigate("/login");
  };

  if (neon) {
    return (
      <nav className="relative z-20 border-b border-cyan-500/25 bg-neon-panel/80 backdrop-blur-xl shadow-neon">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center font-display font-bold text-neon-bg bg-gradient-to-br from-neon-cyan to-neon-magenta shadow-neon group-hover:shadow-neon-magenta transition-shadow">
                <Zap size={18} />
              </div>
              <span className="font-display font-bold text-lg tracking-wider text-neon-text">
                FIN<span className="text-neon-magenta">TRACK</span>
              </span>
              <span className="hidden sm:inline text-xs font-semibold px-2 py-1 rounded-full border border-neon-cyan/40 text-neon-cyan bg-neon-cyan/10">
                {envConfig?.badge}
              </span>
            </Link>

            {user && (
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 text-neon-text hover:text-neon-cyan transition-colors"
                  >
                    <User size={20} />
                    <span className="hidden sm:inline font-medium">{user.name}</span>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 neon-card py-1 z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-neon-text hover:bg-neon-cyan/10 hover:text-neon-cyan"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Profile Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-neon-magenta hover:bg-neon-magenta/10 flex items-center space-x-2"
                      >
                        <LogOut size={16} />
                        <span>Disconnect</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className="bg-white shadow-md"
      style={{ borderTop: `3px solid ${envConfig?.color || "#3B82F6"}` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div
              className="w-8 h-8 rounded-lg"
              style={{ backgroundColor: envConfig?.color || "#3B82F6" }}
            />
            <span className="font-bold text-xl text-gray-800">FinTrack</span>
            {envConfig && (
              <span
                className="hidden sm:inline text-xs font-semibold px-2 py-1 rounded-full"
                style={{ backgroundColor: envConfig.bgColor, color: envConfig.color }}
              >
                {envConfig.badge}
              </span>
            )}
          </Link>

          {user && (
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                >
                  <User size={20} />
                  <span className="hidden sm:inline">{user.name}</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center space-x-2"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
