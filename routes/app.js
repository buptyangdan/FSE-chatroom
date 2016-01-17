/**
* Module dependencies.
*/

var express = require('express')
, http = require('http')
, path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + 'views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, '../public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var users = {};//store all users' information

app.get('/', function (req, res) {
  if (req.cookies.user == null) {
    res.redirect('/signin');
  } else {
    res.sendfile('views/index.html');
  }
});
app.get('/signin', function (req, res) {
  res.sendfile('views/signin.html');
});
app.post('/signin', function (req, res) {
  if (users[req.body.name]) {
    //exist ,cannot login
    res.redirect('/signin');
  } else {
    //no transfer to login page
    res.cookie("user", req.body.name, {maxAge: 1000*60*60*24*7});
    res.redirect('/');
  }
});

app.get('/logout',function(req, res){
  res.clearCookie('user');
});

app.get('/api/talk', function (req, res) {
    var fromuser = req.query.fromuser;
    var touser = req.query.touser;
    console.log(fromuser);
    console.log(touser);
    var dbh = require('../model/dbhandler')();
    dbh.get_talk(fromuser, touser,function (err, talks) {
        if (err)
            res.json([])
        res.json(talks);
    });
});

var server = http.createServer(app);

var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
  //someone online
  var dbh = require('../model/dbhandler')();
  socket.on('online', function (data) {
    //save online username into socket 
    socket.name = data.user;
    //insert users if database doesn't contain this information
    if (!users[data.user]) {
      dbh.add_user(data.user);
      users[data.user] = data.user;
    }
    //emit to all users
    io.sockets.emit('online', {users: users, user: data.user});
  });

  //someone begin to talk
  socket.on('say', function (data) {
    var date = new Date();
    var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds());
    data['time'] = time;
    dbh.add_talk(data,function(err, lastID){
      if(err){
        console.log('database error');
      }
    });
    if (data.to == 'all') {
      //emit talking information to other users
      socket.broadcast.emit('say', data);
    } else {
      //sending information to specific user
      //using clients to save all user information 
      var clients = io.sockets.clients();
      //loop to find the specific username 
      clients.forEach(function (client) {
        if (client.name == data.to) {
          client.emit('say', data);
        }
      });
    }
  });

  //someone disconnect
  socket.on('disconnect', function() {
    //if user has existed
    if (users[socket.name]) {
      //delete from user list
      delete users[socket.name];
      //emit to other users
      socket.broadcast.emit('offline', {users: users, user: socket.name});
    }
  });
});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
