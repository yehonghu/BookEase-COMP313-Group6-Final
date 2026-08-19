/**
 * @module server
 * @description Server entry point.
 * Connects to database and starts the Express server.
 */

const app = require('./src/app');
const connectDB = require('./src/config/db');
const { PORT, validateProductionEnv } = require('./src/config/env');
const { ensureBootstrapAdmin } = require('./src/utils/bootstrapAdmin');

const startServer = async () => {
  try {
    validateProductionEnv();
    await connectDB();
    await ensureBootstrapAdmin();
    app.listen(PORT, () => {
      console.log(`\n🚀 BookEase Server running on port ${PORT}`);
      console.log(`📍 API: http://localhost:${PORT}/api`);
      console.log(`💚 Health: http://localhost:${PORT}/api/health\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
