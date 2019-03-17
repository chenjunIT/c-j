var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  let dataName = req.query.dataName;
  let common_data={
    ...res.user_session,dataName,
    page_header:dataName,
    active:dataName
  }
  res.render('banner',common_data);
});

router.use('/add', require('./banner/add'));
router.use('/del', require('./banner/del'));
router.use('/check', require('./banner/check'));

module.exports = router;
