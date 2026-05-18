import React from 'react';
import { getEnvironment } from '../utils/features';
import { getEnvConfig } from '../constants/environments';
import { Activity, AlertCircle, Lock } from 'lucide-react';

const EnvironmentDashboard = ({ user }) => {
  const env = getEnvironment();
  const envConfig = getEnvConfig(env);

  const getEnvironmentMessage = () => {
    switch (env) {
      case 'development':
        return { title: '🧪 Development Environment', message: 'All features enabled. Feel free to experiment!', color: envConfig.color, bg: envConfig.bgColor, tips: ['✨ Try experimental features', '🔍 Use debug panel', '📊 Test all charts', '🗑️ Delete data freely'] };
      case 'staging':
        return { title: '⚙️ Staging Environment', message: 'Pre-production testing. Limited write operations.', color: envConfig.color, bg: envConfig.bgColor, tips: ['✅ Core features tested', '⚡ Optimizations active', '📈 Analytics ready', '🚫 Delete disabled'] };
      case 'production':
        return { title: '🔒 Production Environment', message: 'Live environment. Read-only mode for safety.', color: envConfig.color, bg: envConfig.bgColor, tips: ['🔐 Read-only operations', '⚡ Optimized for speed', '📊 View your data', '💾 Auto backups'] };
      default:
        return { title: 'FinTrack', message: 'Welcome back!', color: '#10B981', bg: '#F0FDF4', tips: [] };
    }
  };

  const envMessage = getEnvironmentMessage();

  return (
    <div className="mb-8">
      <div className="rounded-lg p-6" style={{ backgroundColor: envMessage.bg, borderLeft: `4px solid ${envMessage.color}` }}>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{envMessage.title}</h2>
            <p className="text-gray-700 mb-4">{envMessage.message}</p>
            <div className="space-y-1">
              {envMessage.tips.map((tip, idx) => (
                <p key={idx} className="text-sm text-gray-600">{tip}</p>
              ))}
            </div>
          </div>
          <div className="ml-4 flex-shrink-0">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style={{ backgroundColor: envMessage.color + '20' }}>
              {env === 'development' ? '🧪' : env === 'staging' ? '⚙️' : '🔒'}
            </div>
          </div>
        </div>
      </div>

      {env === 'production' && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
          <Lock size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900">Read-Only Mode</h3>
            <p className="text-sm text-blue-700 mt-1">View financial data in production. Create, edit, delete disabled for safety.</p>
          </div>
        </div>
      )}

      {env === 'staging' && (
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-900">Staging Environment</h3>
            <p className="text-sm text-yellow-700 mt-1">Pre-production testing. Limited features available.</p>
          </div>
        </div>
      )}

      {env === 'development' && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
          <Activity size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900">Development Mode Active</h3>
            <p className="text-sm text-blue-700 mt-1">Full access to all features. Debug panel enabled.</p>
          </div>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4" style={{ borderColor: envConfig.color }}>
          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Environment</p>
          <p className="text-lg font-bold text-gray-900">{envConfig.name}</p>
          <p className="text-xs text-gray-500 mt-2">{envConfig.badge}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4" style={{ borderColor: envConfig.color }}>
          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Status</p>
          <p className="text-lg font-bold text-gray-900">{env === 'development' ? 'Active' : env === 'staging' ? 'Testing' : 'Live'}</p>
          <p className="text-xs text-gray-500 mt-2">{env === 'development' ? 'Full features' : env === 'staging' ? 'Limited' : 'Read-only'}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4" style={{ borderColor: envConfig.color }}>
          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">User</p>
          <p className="text-lg font-bold text-gray-900">{user?.name || 'Demo'}</p>
          <p className="text-xs text-gray-500 mt-2">{user?.email || 'demo@fintrack.io'}</p>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentDashboard;
