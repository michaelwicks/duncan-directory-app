var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

var search = require('./search');
<<<<<<< HEAD

app.use('/', search);
=======
var image = require('./image');

app.use('/', search);
app.use('/', image);
>>>>>>> c85c12e1b113d30506de76d900098f28a5b4f7e3

app.listen(port);
