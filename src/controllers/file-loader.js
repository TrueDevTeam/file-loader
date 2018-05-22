const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const config = require('config');
const uuid = require('uuid/v4');

const {
  BAD_REQUEST_CODE,
  INTERNAL_ERROR_CODE,
  NO_PATH_ERROR
} = require('../constants/constants');
const logger = require('../utils/logger');

const basePath = config.fileDir;

if(!basePath) {
  throw new Error(NO_PATH_ERROR);
}

//TODO get image endpoint
//todo file-type
const loadFile = async (request, response) => {
  if (!request.body || !request.body.image) {
    return response.status(BAD_REQUEST_CODE).send();
  }
  const base64Image = request.body.image;
  const buffer = Buffer.from(base64Image, 'base64');
  const fileName = `${uuid()}.png`;
  const absolutePath = `${basePath}/${fileName}`;
  try {
    await fs.writeFileAsync(absolutePath, buffer);
  } catch (error) {
    logger.log(error);
    logger.log(1);
    return response.status(INTERNAL_ERROR_CODE).send();
  }
  const result = {
    href: `/${fileName}`
  }
  return response.json(result);
}

module.exports = {
  loadFile
};


// base64 image sample
// 'Qk1GAAAAAAAAADYAAAAoAAAAAgAAAAIAAAABABgAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAATLEiTLEiAABMsSJMsSIAAA==';

