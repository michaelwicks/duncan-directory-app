var express = require('express');
var router = express.Router();

function search(floorNum) {
    var floorImage = require('./floor_image.json');
    for (var i = 0; i < floorImage.length; i++) {
        if (floorNum == floorImage[i].floor)
            return floorImage[i].link;
        if (i == floorImage.length - 1) {
            return "floor does not exist";
        }
    }
}

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/image', function(req, res) {
    var floorNum = req.query.floor_num;
    res.send(search(floorNum));
});

module.exports = router;
