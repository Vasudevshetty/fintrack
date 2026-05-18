export const ENVIRONMENTS = {
  DEV: "development",
  STG: "staging",
  PROD: "production",
};

export const ENV_ALIASES = {
  dev: "development",
  development: "development",
  stg: "staging",
  staging: "staging",
  prod: "production",
  production: "production",
};

export const ENV_CONFIG = {
  development: {
    name: "Development",
    short: "DEV",
    emoji: "🧪",
    color: "#3B82F6",
    bgColor: "#EFF6FF",
    shellBg: "#DBEAFE",
    authGradientFrom: "#2563EB",
    authGradientTo: "#60A5FA",
    badge: "🧪 DEVELOPMENT",
    description: "Experimental Features Hub",
    apiUrl: "http://localhost:5000/api",
    demoUser: "demo@dev.fintrack.io",
    demoPassword: "Demo@123",
  },
  staging: {
    name: "Staging",
    short: "STG",
    emoji: "⚙️",
    color: "#A855F7",
    bgColor: "#FAF5FF",
    shellBg: "#F3E8FF",
    authGradientFrom: "#7C3AED",
    authGradientTo: "#C084FC",
    badge: "⚙️ STAGING",
    description: "Enterprise Ready",
    apiUrl: process.env.REACT_APP_API_URL || "/api",
    demoUser: "demo@stg.fintrack.io",
    demoPassword: "Demo@123",
  },
  production: {
    name: "Production",
    short: "PRD",
    emoji: "🔒",
    color: "#10B981",
    bgColor: "#F0FDF4",
    shellBg: "#DCFCE7",
    authGradientFrom: "#059669",
    authGradientTo: "#34D399",
    badge: "🔒 PRODUCTION",
    description: "Smart Finance Management",
    apiUrl: process.env.REACT_APP_API_URL || "/api",
    demoUser: "demo@prod.fintrack.io",
    demoPassword: "Demo@123",
  },
};

export const normalizeEnvironment = (env) => {
  if (!env) return ENVIRONMENTS.DEV;
  return ENV_ALIASES[env.toLowerCase()] || ENVIRONMENTS.DEV;
};

export const getEnvConfig = (env) => {
  return ENV_CONFIG[env] || ENV_CONFIG.production;
};

export const DEMO_CREDENTIALS = {
  development: [
    { email: "demo@dev.fintrack.io", password: "Demo@123", role: "Admin" },
    { email: "user1@dev.fintrack.io", password: "User@123", role: "Viewer" },
    { email: "user2@dev.fintrack.io", password: "User@123", role: "Editor" },
  ],
  staging: [
    { email: "demo@stg.fintrack.io", password: "Demo@123", role: "Admin" },
    { email: "user1@stg.fintrack.io", password: "User@123", role: "Viewer" },
    { email: "user2@stg.fintrack.io", password: "User@123", role: "Viewer" },
  ],
  production: [
    { email: "demo@prod.fintrack.io", password: "Demo@123", role: "Viewer" },
  ],
};
