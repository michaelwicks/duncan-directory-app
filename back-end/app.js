var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

var testemail = require('./testemail');
var eventemail = require('./eventemail');

app.use('/', testemail);
app.use('/', eventemail);

app.listen(port);
