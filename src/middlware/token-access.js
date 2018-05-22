const encodingService = require('../utils/encoding-util');
const {
  FORBIDDEN_STATUS_CODE,
  AUTHORIZATION_HEADER
} = require('../constants/constants');

const rootAdminAccessMiddleware = async (req, res, next) => {
  const authHeaderContent = req.headers[AUTHORIZATION_HEADER];
  if (!authHeaderContent) {
    return res.status(FORBIDDEN_STATUS_CODE).send();
  }
  const token = authHeaderContent.replace(/^JWT /, '');
  try {
    req.tokenPayload = await encodingService.verifyToken(token);
  } catch (err) {
    return res.status(FORBIDDEN_STATUS_CODE).send();
  }
  next();
}

module.exports = rootAdminAccessMiddleware;
