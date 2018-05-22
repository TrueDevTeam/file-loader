const SUCCESS_STATUS_CODE = 200;
const BAD_REQUEST_CODE = 400;
const FORBIDDEN_STATUS_CODE = 403;
const NOT_FOUND_CODE = 404;
const INTERNAL_ERROR_CODE = 500;
const AUTHORIZATION_HEADER = 'authorization';

const NO_PATH_ERROR = 'No path specified';
const WRONG_EXTENSION = 'Wrong file extension';

const allowedImageExtensions = [
  'jpg',
  'png',
  'bmp'
];

module.exports = {
  SUCCESS_STATUS_CODE,
  BAD_REQUEST_CODE,
  FORBIDDEN_STATUS_CODE,
  NOT_FOUND_CODE,
  INTERNAL_ERROR_CODE,
  AUTHORIZATION_HEADER,
  NO_PATH_ERROR,
  WRONG_EXTENSION,
  allowedImageExtensions
};
