const Raven = require('raven');
const config = require('config');

Raven.config(config.sentryDsn).install();

module.exports = Raven;
