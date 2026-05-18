import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../utils/api";
import { Mail, Lock, User as UserIcon } from "lucide-react";
import { getEnvironment } from "../utils/features";
import { getEnvConfig } from "../constants/environments";

export const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    currency: "USD",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const envConfig = getEnvConfig(getEnvironment());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authAPI.register(formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: `linear-gradient(135deg, ${envConfig.authGradientFrom} 0%, ${envConfig.authGradientTo} 100%)`,
      }}
    >
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-2">Create Account</h1>
        <p className="text-center text-gray-600 mb-2">Join FinTrack today</p>
        <p className="text-center mb-8">
          <span
            className="text-xs font-semibold px-2 py-1 rounded-full"
            style={{ backgroundColor: envConfig.bgColor, color: envConfig.color }}
          >
            {envConfig.badge}
          </span>
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <UserIcon
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input pl-10"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currency
            </label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="input"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="INR">INR</option>
              <option value="JPY">JPY</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white font-medium py-2 px-4 rounded-lg transition disabled:opacity-50"
            style={{ backgroundColor: envConfig.color }}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="hover:underline font-medium"
            style={{ color: envConfig.color }}
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
