var express = require('express');
var router = express.Router();

/* GET home page. */
console.log("**")
console.log(router)
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
