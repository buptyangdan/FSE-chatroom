var models = require('../models');

var user_directory = {};
var unreadlist = {};
module.exports = function (socket) {
    socket.on('sendChat', function (msg) {
        socket.broadcast.emit('sendChat', msg);
    });

    socket.on('online', function (cmd) {
        if (!user_directory[cmd.user] || cmd.user == null) {
            //emit to all users
            socket.broadcast.emit('online', {user: cmd.user});
        }

        if (cmd.user != null) {
            //save online username into socket
            user_directory[cmd.user] = socket;
            //insert users if database doesn't contain this information
            socket.name = cmd.user;

            var userlist = {};
            for (var user in user_directory){
                userlist[user] = 0;
            }
            socket.emit("userlist", userlist);
        }
    });

    //someone begins to talk
    socket.on('say', function (data){
      models.Chat.create({
        content: data.msg,
        timestamp: data.time,
        from_user: data.fromId,
        to_user: data.toId
      });
        if (user_directory[data.to]){
            user_directory[data.to].emit('say', data);
        }
    });

    socket.on("unreadlist", function(data){
        console.log("save: " + data.from);
        unreadlist[data.from] = data.unreadlist;
    });

    socket.on("getunreadlist", function(from){
        console.log("get " + from);
        socket.emit("unreadlist", unreadlist[from]);
    })

//    someone disconnect
    socket.on('logout', function(cmd) {
        //if user has existed
        if (user_directory[cmd.user]) {
            //delete from user list
            delete user_directory[socket.name];
            //emit to other users
            socket.broadcast.emit('offline', {user: socket.name});
        }
    });
};
