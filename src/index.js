const express = require('express');
const config = require('config');
var bodyParser = require('body-parser');

const { loadFile, getFile } = require('./controllers/file-loader');
const tokenAccessMidddlware = require('./middlware/token-access');

const app = express();

if (!config.port) {
  throw new Error('Port is not specified');
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(tokenAccessMidddlware);

app.post('/images', loadFile);
app.get('/images/:fileName', getFile);

app.listen(config.port);