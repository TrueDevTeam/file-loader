const express = require('express');
const config = require('config');
var bodyParser = require('body-parser');
const { loadFile } = require('./controllers/file-loader');
const tokenAccessMidddlware = require('./middlware/token-access');

const app = express();

if (!config.port) {
  throw new Error('Port is not specified');
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(tokenAccessMidddlware);

app.post('/images', loadFile);

app.listen(config.port);