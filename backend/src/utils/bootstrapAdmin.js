const User = require('../models/User.model');

/**
 * Creates the first administrator only when explicit production secrets are set.
 * This replaces using publicly documented seed credentials in a deployed service.
 */
const ensureBootstrapAdmin = async () => {
  const email = process.env.BOOTSTRAP_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.BOOTSTRAP_ADMIN_PASSWORD;

  if (!email && !password) return;
  if (!email || !password) {
    throw new Error('BOOTSTRAP_ADMIN_EMAIL and BOOTSTRAP_ADMIN_PASSWORD must be configured together.');
  }
  if (password.length < 12) {
    throw new Error('BOOTSTRAP_ADMIN_PASSWORD must contain at least 12 characters.');
  }

  const existing = await User.findOne({ email }).select('_id role');
  if (existing) {
    if (existing.role !== 'admin') {
      throw new Error('BOOTSTRAP_ADMIN_EMAIL already belongs to a non-admin account. Choose a different email.');
    }
    return;
  }

  await User.create({
    name: process.env.BOOTSTRAP_ADMIN_NAME?.trim() || 'BookEase Admin',
    email,
    password,
    role: 'admin',
    location: 'Toronto, ON',
  });
  console.log(`Bootstrap administrator created for ${email}.`);
};

module.exports = { ensureBootstrapAdmin };
