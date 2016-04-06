var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var socketio = require('socket.io');
var passport = require('passport');

var routes = require('./routes/index');
var users = require('./routes/users');
var chats = require('./routes/chats');
var announcement = require('./routes/announcement');
var performance = require('./routes/performance');
var search = require('./routes/search');
var apis = require('./routes/api');
var profile = require('./routes/profile');

var app = express();
var io = socketio();
app.io = io;

//io.on('connection', function (socket) {
//    console.log('New User Connected')
//    socket.on('sendChat', function(msg){
//      io.emit('sendChat', msg);
//    });
//});

var socketfunction = require('./routes/socket');
var user_directory = {};
io.on('connection',socketfunction);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), {
  etag: false
}));
app.use(session({secret: 'maytheforcebewithyou'}));
// app.use(passport.initialize());
// app.use(passport.session());
app.use('/', routes);
app.use('/users', users);
app.use('/chats', chats);
app.use('/announcement', announcement);
app.use('/performance', performance);
app.use('/search', search);
app.use('/api', apis);
app.use('/profile', profile);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      title: "Error Occurs",
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
