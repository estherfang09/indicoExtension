var express = require('express');
var router = express.Router();
var watson = require('./node_modules/watson-developer-cloud');

var tone_analyzer = watson.tone_analyzer({
	username: '5ad7ebe8-55fc-4154-93a0-35b46dbe44dc',
	password: 'k4GLhit7F0S7',
	version: 'v3',
	version_date: '2016-05-19 '
});


/* GET users listing. */
router.get('/tone', function(req, res, next) {
	tone_analyzer.tone({ text: req.data},
		function(err, tone) {
			if (err)
				console.log(err);
			else
				return JSON.stringify(tone, null, 2);
	});
	res.send('respond with a resource');
});

module.exports = router;
