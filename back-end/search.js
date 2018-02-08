var express = require('express');
var router = express.Router();

function search(keyword) {
    var keywords = require('./keywords.json');
    for (var i = 0; i < keywords.length; i++) {
        if (keyword == keywords[i].keyword)
            return keywords[i];
        if (i == keywords.length - 1) {
            return "keyword does not exist";
        }
    }
}

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/search', function(req, res) {
    var keyword = req.query.keyword;
    res.send(search(keyword));
});

module.exports = router;
