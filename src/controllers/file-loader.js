const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const config = require('config');
const uuid = require('uuid/v4');
const fileType = require('file-type');

const {
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  INTERNAL_ERROR_CODE,
  NO_PATH_ERROR,
  WRONG_EXTENSION,
  allowedImageExtensions
} = require('../constants/constants');
const logger = require('../utils/logger');

const basePath = config.fileDir;

if(!basePath) {
  throw new Error(NO_PATH_ERROR);
}

const loadFile = async (request, response) => {
  if (!request.body || !request.body.image) {
    return response.status(BAD_REQUEST_CODE).send();
  }
  const base64Image = request.body.image;
  const buffer = Buffer.from(base64Image, 'base64');
  const extension = fileType(buffer).ext;
  if (!allowedImageExtensions.includes(extension)) {
    logger.log({
      level: 'error',
      message: `${WRONG_EXTENSION}: ${extension}`
    });
    return response.status(BAD_REQUEST_CODE).json({
      message: WRONG_EXTENSION
    });
  }
  const fileName = `${uuid()}.${extension}`;
  const absolutePath = `${basePath}/${fileName}`;
  try {
    await fs.writeFileAsync(absolutePath, buffer);
  } catch (error) {
    logger.log({
      level: 'error',
      message: error.message
    });
    return response.status(INTERNAL_ERROR_CODE).send();
  }
  const result = {
    href: `/${fileName}`
  }
  return response.json(result);
};

const getFile = async (request, response) => {
  const { fileName } = request.params;
  if (!fileName) {
    return response.status(BAD_REQUEST_CODE).send();
  }
  const absolutePath = `${basePath}/${fileName}`;
  if (!fs.existsSync(absolutePath)) {
    return response.status(NOT_FOUND_CODE).send();
  }
  return response.sendFile(absolutePath);
};

module.exports = {
  loadFile,
  getFile
};


// base64 image sample
// 'Qk1GAAAAAAAAADYAAAAoAAAAAgAAAAIAAAABABgAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAATLEiTLEiAABMsSJMsSIAAA==';

