var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  delete req.session.username;

  res.send({error:0,msg:'注销成功'});
});

module.exports = router;
