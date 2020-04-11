var express = require('express');
var router = express.Router();

/* GET test listing. */
router.get('/', function(req, res, next) {
  res.send('Test dhfkdfjhfdkhdk');
});

module.exports = router;
