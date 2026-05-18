import { normalizeEnvironment } from "../constants/environments";

const ENVIRONMENT = normalizeEnvironment(
  import.meta.env.VITE_ENVIRONMENT || import.meta.env.ENVIRONMENT || "development",
);

const FEATURE_FLAGS = {
  development: {
    EXPORT: true,
    DELETE: true,
    ADVANCED_FILTERING: true,
    EXPERIMENTAL: true,
    DEBUG_PANEL: true,
    CARD_EDIT: true,
    TRANSACTION_EDIT: true,
    BUDGET_DELETE: true,
    PROFILE_EDIT: true,
  },
  staging: {
    EXPORT: false,
    DELETE: false,
    ADVANCED_FILTERING: true,
    EXPERIMENTAL: false,
    DEBUG_PANEL: false,
    CARD_EDIT: true,
    TRANSACTION_EDIT: true,
    BUDGET_DELETE: false,
    PROFILE_EDIT: true,
  },
  production: {
    EXPORT: false,
    DELETE: false,
    ADVANCED_FILTERING: false,
    EXPERIMENTAL: false,
    DEBUG_PANEL: false,
    CARD_EDIT: false,
    TRANSACTION_EDIT: false,
    BUDGET_DELETE: false,
    PROFILE_EDIT: false,
  },
};

const getFeatureFlags = () => FEATURE_FLAGS[ENVIRONMENT] || FEATURE_FLAGS.production;

export const isFeatureEnabled = (feature) => {
  const flags = getFeatureFlags();
  return flags[feature] || false;
};

export const getEnvironment = () => ENVIRONMENT;

export default FEATURE_FLAGS;
