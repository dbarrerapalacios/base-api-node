var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var bodyParser = require('body-parser');
const config = require('config');
const { error404, error500, cors, options } = require('./middleware');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('./libConfig/swagger');
const swaggerDocs = swaggerJsDoc(swaggerDocument);

var app = express();

// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
 
// // parse application/json
// app.use(bodyParser.json())
app.use(logger(config.get('logger')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors);
app.use(options);

app.use('/', require('./apiServices/index'));
app.use('/users', require('./apiServices/users/routes'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(error404);
app.use(error500);

module.exports = app;
