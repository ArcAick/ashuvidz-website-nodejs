var express = require('express');
var router = express.Router();
var youtube = require('../models/youtube');

router.get('/', function(req, res, next) {
    youtube.videoPageGenerator().then(
        function(data){
            res.render('videos', {model : JSON.parse(data)});
        }
    );

});

module.exports = router;
