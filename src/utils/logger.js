const winston = require('winston');

const logger = new winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.Console()
  ]
});

module.exports = logger;
