var express = require('express');
var router = express.Router();
var app = express();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
var watson = require('../node_modules/watson-developer-cloud');

var tone_analyzer = watson.tone_analyzer({
  username: '5ad7ebe8-55fc-4154-93a0-35b46dbe44dc',
  password: 'k4GLhit7F0S7',
  version: 'v3',
  version_date: '2016-05-19 '
});

/* GET users listing. */
router.post('/tone', function(req, res, next) {

		console.log("what is the body" + req.body.data);
     tone_analyzer.tone({ text: req.body.data},
    function(err, tone) {
      console.log(req.body.data);
      if (err){
        console.log(err);
      }
      else{

        res.send(JSON.stringify(tone, null, 2));
        //return JSON.stringify(tone, null, 2);
      }
   
  console.log(req);
  
  });
  //res.send('respond with a resource');
});

module.exports = router;
