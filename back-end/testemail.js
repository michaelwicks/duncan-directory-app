var express = require('express');
var router = express.Router();
var email = require('./emailClass.js');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.post('/', jsonParser, function(req, res) {
    console.log(req.body.keyword);
    email.send(req.body.email, req.body.name, req.body.keyword);
    res.send();
});

module.exports = router;
