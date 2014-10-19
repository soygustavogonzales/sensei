var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/blackboard', function(req, res) {
		/* Usando este URI.../blackboard?roomId=132&userId=oswaldo*/
		console.log(req.query.roomId) 
		console.log(req.query.userId) 
  res.render('index', { title: 'Express' });
});

module.exports = router;
