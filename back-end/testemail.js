var express = require('express');
var router = express.Router();
var email = require('./email.js')

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.post('/testemail', function(req, res) {
    email.send('joh4@nd.edu', 'bob', 'none');
});

module.exports = router;
