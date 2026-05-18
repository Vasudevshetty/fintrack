import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Navbar, Sidebar } from "./components";
import {
  Login,
  Register,
  Dashboard,
  Cards,
  Transactions,
  Budget,
  Profile,
  Settings,
  Landing,
  EnvironmentDashboard,
} from "./pages";
import "./index.css";
import { Menu } from "lucide-react";
import { getEnvironment } from "./utils/features";
import { getEnvConfig } from "./constants/environments";
import { isNeonDev } from "./theme/neon";

function App() {
  const env = getEnvironment();
  const envConfig = getEnvConfig(env);
  const neon = isNeonDev();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("neon-dev", neon);
    return () => document.documentElement.classList.remove("neon-dev");
  }, [neon]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const handleUpdateUser = (userData) => {
    setUser(userData);
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center h-screen font-body ${neon ? "bg-neon-bg" : ""}`}
        style={neon ? undefined : { backgroundColor: envConfig.shellBg }}
      >
        <div className="text-center">
          {neon ? (
            <>
              <div className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-neon-cyan animate-spin border-t-transparent shadow-neon" />
              <p className="font-display text-neon-cyan tracking-widest animate-neon-pulse">
                INITIALIZING GRID...
              </p>
            </>
          ) : (
            <>
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 animate-spin"
                style={{ backgroundColor: envConfig.color }}
              />
              <p className="text-gray-600">Loading...</p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <Router>
      {user ? (
        <div
          className={`flex h-screen font-body ${neon ? "bg-neon-bg text-neon-text" : ""}`}
          style={neon ? undefined : { backgroundColor: envConfig.shellBg }}
        >
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} neon={neon} />

          <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar user={user} onLogout={handleLogout} envConfig={envConfig} neon={neon} />

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`md:hidden p-4 fixed bottom-4 right-4 z-30 rounded-full shadow-lg ${
                neon
                  ? "bg-neon-panel border border-neon-cyan/50 text-neon-cyan shadow-neon"
                  : "text-gray-700 hover:bg-gray-200 bg-white"
              }`}
            >
              <Menu size={24} />
            </button>

            <main className="flex-1 overflow-auto">
              <div className="max-w-7xl mx-auto p-6">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <>
                        <EnvironmentDashboard user={user} neon={neon} />
                        <Dashboard user={user} neon={neon} />
                      </>
                    }
                  />
                  <Route path="/cards" element={<Cards />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/budget" element={<Budget />} />
                  <Route
                    path="/profile"
                    element={
                      <Profile user={user} onUpdate={handleUpdateUser} />
                    }
                  />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
