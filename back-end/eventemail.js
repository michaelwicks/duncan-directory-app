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

//Calls function in emailClass.js and sends data from main.js to sparkpost with a POST request
router.post('/', jsonParser, function(req, res) {
    email.multisend(req.body.email, req.body.eventTitle,  req.body.eventDescription, req.body.eventLocation);
    res.send();
});

module.exports = router;
