/**
 * Environment Configuration
 * Centralized environment-specific configuration
 */

const ENV = import.meta.env.MODE || 'development';

const environments = {
  development: {
    name: 'Development',
    api: {
      baseUrl: 'https://services.leadconnectorhq.com',
      timeout: 30000,
      retryAttempts: 3,
    },
    features: {
      debugMode: true,
      enableLogging: true,
      enableAnalytics: false,
    },
    logging: {
      level: 'debug',
      enableConsole: true,
      enableRemote: false,
    },
  },
  
  staging: {
    name: 'Staging',
    api: {
      baseUrl: 'https://services.leadconnectorhq.com',
      timeout: 30000,
      retryAttempts: 3,
    },
    features: {
      debugMode: false,
      enableLogging: true,
      enableAnalytics: true,
    },
    logging: {
      level: 'info',
      enableConsole: true,
      enableRemote: true,
    },
  },
  
  production: {
    name: 'Production',
    api: {
      baseUrl: 'https://services.leadconnectorhq.com',
      timeout: 30000,
      retryAttempts: 3,
    },
    features: {
      debugMode: false,
      enableLogging: false,
      enableAnalytics: true,
    },
    logging: {
      level: 'error',
      enableConsole: false,
      enableRemote: true,
    },
  },
};

const currentEnv = environments[ENV] || environments.development;

export const ENVIRONMENT = {
  ...currentEnv,
  isDevelopment: ENV === 'development',
  isStaging: ENV === 'staging',
  isProduction: ENV === 'production',
  mode: ENV,
};

export default ENVIRONMENT; 