import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, TrendingUp, PieChart, AlertCircle, ArrowRight, Lock } from 'lucide-react';
import { getEnvironment } from '../utils/features';
import { getEnvConfig } from '../constants/environments';

const Landing = () => {
  const navigate = useNavigate();
  const env = getEnvironment();
  const envConfig = getEnvConfig(env);

  const features = {
    development: [
      { icon: CreditCard, title: 'Credit Card Management', desc: 'Add, edit, and delete cards freely' },
      { icon: TrendingUp, title: 'Advanced Analytics', desc: 'Full dashboard with all metrics' },
      { icon: PieChart, title: 'Detailed Reports', desc: 'Export and analyze your data' },
      { icon: AlertCircle, title: 'Smart Budgeting', desc: 'Full budget control and alerts' },
      { icon: Lock, title: 'Experimental Features', desc: 'Test new features in development' },
    ],
    staging: [
      { icon: CreditCard, title: 'Credit Card Management', desc: 'View and create cards' },
      { icon: TrendingUp, title: 'Core Analytics', desc: 'Standard dashboard metrics' },
      { icon: PieChart, title: 'Basic Reports', desc: 'View spending insights' },
      { icon: AlertCircle, title: 'Budget Management', desc: 'Create and track budgets' },
    ],
    production: [
      { icon: CreditCard, title: 'Card Overview', desc: 'View all your credit cards' },
      { icon: TrendingUp, title: 'Spending Analytics', desc: 'Real-time spending insights' },
      { icon: PieChart, title: 'Category Breakdown', desc: 'See where your money goes' },
      { icon: AlertCircle, title: 'Budget Tracking', desc: 'Monitor budget progress' },
    ],
  };

  const comingSoon = {
    development: ['Expense Forecasting with AI', 'Smart Categorization', 'Receipt Scanning', 'Recurring Templates'],
    staging: ['Performance Optimization', 'Enhanced Reporting', 'Team Collaboration (Beta)'],
    production: ['Mobile App', 'Investment Tracking', 'Tax Reporting'],
  };

  return (
    <div className={`min-h-screen ${envConfig.bgColor}`} style={{ borderTop: `4px solid ${envConfig.color}` }}>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xl font-bold" style={{ backgroundColor: envConfig.color }}>
              {envConfig.emoji}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">FinTrack</h1>
              <p className="text-xs text-gray-500">{envConfig.badge}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => navigate('/login')} className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition">Sign In</button>
            <button onClick={() => navigate('/register')} className="px-4 py-2 rounded-lg font-medium text-white transition" style={{ backgroundColor: envConfig.color }}>Get Started</button>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: envConfig.bgColor, color: envConfig.color }}>
              {envConfig.emoji}
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {env === 'development' ? '✨ FinTrack Dev - Experimental Features Hub' : env === 'staging' ? '💼 FinTrack Staging - Enterprise Ready' : '💰 FinTrack - Smart Finance Management'}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {env === 'development' ? 'Access the latest experimental features and help us shape the future of personal finance.' : env === 'staging' ? 'Pre-production testing environment with optimized features and performance.' : 'Track, analyze, and optimize your spending with intelligent financial insights.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {(features[env] || features.production).map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: envConfig.bgColor, color: envConfig.color }}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{feature.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">🚀 Coming Soon</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(comingSoon[env] || comingSoon.production).map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: envConfig.color }}></div>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r rounded-lg p-8 shadow-md" style={{ backgroundImage: `linear-gradient(135deg, ${envConfig.color} 0%, ${envConfig.color}99 100%)` }}>
          <div className="text-white">
            <h3 className="text-2xl font-bold mb-4">Quick Start</h3>
            {env === 'production' ? (
              <p className="mb-6">Sign in with your account to access your financial dashboard.</p>
            ) : (
              <>
                <p className="mb-6">Try the demo account to explore all features:</p>
                <div className="bg-white bg-opacity-20 rounded p-4 mb-6">
                  <p className="text-sm font-mono">
                    📧 {envConfig.demoUser}<br />
                    🔑 {envConfig.demoPassword}
                  </p>
                </div>
              </>
            )}
            <button onClick={() => navigate('/login')} className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition flex items-center gap-2">
              Get Started <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-sm text-gray-600">
          <p className="mb-2">
            {env === 'development' ? 'v1.0-dev | Development Database | 🧪 Experimental Features Enabled' : env === 'staging' ? 'v1.0-rc.1 | Staging Database | ⚙️ Performance Optimizations Active' : 'v1.0.0 | Production Database | 🔒 Stable & Secure'}
          </p>
          <p className="text-xs text-gray-500">
            Environment: <span style={{ color: envConfig.color }} className="font-semibold">{envConfig.badge}</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
