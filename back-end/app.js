var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

var testemail = require('./testemail');

app.use('/', testemail);

app.listen(port);
