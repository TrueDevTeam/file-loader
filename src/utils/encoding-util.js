const Promise = require('bluebird');
const os = require('os');
const appConfig = require('config');
const jwt = Promise.promisifyAll(require('jsonwebtoken'));
const fs = Promise.promisifyAll(require('fs'));

const Raven = require('./sentry-client');

const verifyToken = async (token) => {
  try {
    const publicKeyPath = appConfig.publicKey;
    const absolutePath = os.homedir() + publicKeyPath;
    const cert = await fs.readFileSync(absolutePath);
    const jwtPayload = await jwt.verifyAsync(token, cert);
    return Promise.resolve(jwtPayload);
  } catch (error) {
    Raven.captureException(error);
    return Promise.reject(error);
  }
};

module.exports = {
  verifyToken
};
