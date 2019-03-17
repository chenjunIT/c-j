var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cookieSession = require('cookie-session');
var bodyParser = require('body-parser')
let multer  = require('multer');	//引入

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser());
app.use(cookieSession({
  keys:['aa','bb'],
  name:'node_id',
  // maxAge:1000*60*60
}));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if(req.url.indexOf('product')!==-1){//根据请求地址的不同
      cb(null, path.join(__dirname, 'public',require('./config/global').upload.product));//public/product
    }
    if(req.url.indexOf('user')!==-1){
      cb(null, path.join(__dirname, 'public',require('./config/global').upload.user))
    }
    if(req.url.indexOf('banner')!==-1){
      cb(null, path.join(__dirname, 'public',require('./config/global').upload.banner))
    }
  }
})

var upload = multer({ storage });//存储方式dest指定死了，storage分目录
// let objMulter = multer({ dest: path.join(__dirname, 'public/upload')});	//实例化  返回 multer对象
app.use(upload.any());  	//any 允许上传任何文件

//资源托管
app.use(express.static(path.join(__dirname, 'public/template')));

//给静态资源条件虚拟目录admin,
//views模板里面的/指向public/admin,加上管理端的响应正好是app.use('/admin/xx)
//所以ejs里面的/ 或者 ./ 或者 ../../都指向了public/admin
app.use('/admin',express.static(path.join(__dirname, 'public/admin/')));
app.use(express.static(path.join(__dirname, 'public')));

//管理端响应
app.use('/admin/login', require('./routes/admin/login'));
app.use('/admin/success', require('./routes/admin/feedback/success'));
app.use('/admin/error', require('./routes/admin/feedback/error'));
app.use('/admin/logout', require('./routes/admin/logout'));

app.all('/admin/*',require('./routes/admin/islogin'))

app.use('/admin', require('./routes/admin/home'));
app.use('/admin/home', require('./routes/admin/home'));

app.use('/admin/product', require('./routes/admin/product'));
app.use('/admin/banner', require('./routes/admin/banner'));
app.use('/admin/user', require('./routes/admin/user'));

//用户端响应api
app.all('/api/*',require('./routes/api/params'))
app.use('/api/product', require('./routes/api/product'));
app.use('/api/banner', require('./routes/api/banner'));
app.use('/api/detail', require('./routes/api/detail'));
app.use('/api/login', require('./routes/api/login'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/logout', require('./routes/api/logout'));
app.use('/api/reg', require('./routes/api/reg'));
app.use('/api/buy', require('./routes/api/buy'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  if(req.url.indexOf('/api') !== -1){
    res.send({error:1,msg:'错误的接口和请求方式'})
  }else{
    res.render('./feedback/app_error');
  }
  
});

module.exports = app;
