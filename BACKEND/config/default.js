module.exports = {
  port: 3000,
  host: 'localhost',
  mode: 'default',
  debug: {
    request: ['error', 'info'],
    log: ['info', 'error', 'warning']
  },
    connections: {
      db: process.env.DB,
    },
    // encryptionKey: process.env.CM_SECRET_KEY
}