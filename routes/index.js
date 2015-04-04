var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',function(req,res){
	res.redirect('/blackboard?roomId=12345&userId=Adan')
})

router.get('/blackboard', function(req, res) {
		/* Usando este URI.../blackboard?roomId=132&userId=oswaldo*/
		console.log(req.query.roomId) 
		console.log(req.query.userId) 
  res.render('index', { title: 'Sensei' });
});

router.get('/includes/:partial',function(req,res){
	console.log(req.params.partial);
	res.render(['includes/',req.params.partial].join(''))
})
module.exports = router;
