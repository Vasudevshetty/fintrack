import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../utils/api";
import { Mail, Lock, Zap } from "lucide-react";
import { getEnvironment } from "../utils/features";
import { getEnvConfig } from "../constants/environments";
import { isNeonDev } from "../theme/neon";

export const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const neon = isNeonDev();
  const envConfig = getEnvConfig(getEnvironment());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await authAPI.login(formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      onLoginSuccess(response.data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  if (neon) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 font-body bg-neon-bg relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-magenta/10 rounded-full blur-3xl" />
        </div>
        <div className="neon-card neon-scanline p-8 max-w-md w-full relative z-10 border-2 border-neon-cyan/40">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-neon-cyan to-neon-magenta shadow-neon">
              <Zap className="text-neon-bg" size={32} />
            </div>
            <h1 className="font-display text-3xl font-bold tracking-wider">
              JACK <span className="text-neon-magenta">IN</span>
            </h1>
            <p className="text-neon-muted mt-2">{envConfig.description}</p>
            <span className="inline-block mt-3 text-xs font-semibold px-3 py-1 rounded-full border border-neon-lime/50 text-neon-lime">
              {envConfig.badge}
            </span>
          </div>

          {error && (
            <div className="bg-neon-magenta/20 border border-neon-magenta/50 text-neon-magenta px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neon-cyan mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-neon-muted" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="neon-input pl-10"
                  placeholder="you@matrix.io"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neon-cyan mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-neon-muted" size={20} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="neon-input pl-10"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full neon-btn-primary py-3 disabled:opacity-50">
              {loading ? "Connecting..." : "Enter the Grid"}
            </button>
          </form>

          <p className="text-center text-neon-muted mt-6">
            New identity?{" "}
            <Link to="/register" className="text-neon-magenta hover:text-neon-cyan font-semibold">
              Initialize
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: `linear-gradient(135deg, ${envConfig.authGradientFrom} 0%, ${envConfig.authGradientTo} 100%)`,
      }}
    >
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-lg mx-auto mb-4 flex items-center justify-center"
            style={{ backgroundColor: envConfig.color }}
          >
            <span className="text-white text-2xl font-bold">₹</span>
          </div>
          <h1 className="text-3xl font-bold">FinTrack</h1>
          <p className="text-gray-600 mt-2">{envConfig.description}</p>
          <span
            className="inline-block mt-2 text-xs font-semibold px-2 py-1 rounded-full"
            style={{ backgroundColor: envConfig.bgColor, color: envConfig.color }}
          >
            {envConfig.badge}
          </span>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input pl-10"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input pl-10"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full text-white font-medium py-2 px-4 rounded-lg transition disabled:opacity-50"
            style={{ backgroundColor: envConfig.color }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="hover:underline font-medium" style={{ color: envConfig.color }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
