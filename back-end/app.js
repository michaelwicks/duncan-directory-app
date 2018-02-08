var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

var search = require('./search');

app.use('/', search);

app.listen(port);
