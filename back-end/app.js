var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

// var search = require('./search');
// var image = require('./image');\
var testemail = require('./testemail');

// app.use('/', search);
// app.use('/', image);
app.use('/', testemail);

app.listen(port);
