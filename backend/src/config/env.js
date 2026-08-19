/**
 * @module config/env
 * @description Environment configuration loader and production validation.
 */

const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const config = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/bookease',
  JWT_SECRET: process.env.JWT_SECRET || 'development_only_secret',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  NODE_ENV: process.env.NODE_ENV || 'development',
};

const validateProductionEnv = () => {
  if (config.NODE_ENV !== 'production') return;

  const missing = [];
  if (!process.env.MONGODB_URI) missing.push('MONGODB_URI');
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) missing.push('JWT_SECRET (minimum 32 characters)');

  if (missing.length) {
    throw new Error(`Missing or insecure production environment configuration: ${missing.join(', ')}`);
  }
};

module.exports = {
  ...config,
  validateProductionEnv,
};
