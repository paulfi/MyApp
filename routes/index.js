var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'myApp',mapDiv:'mapDiv', graphId: 'myGraph',dailyGraph:'dailyGraph' });
});

module.exports = router;
