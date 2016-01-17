var DBHandler = function () {
    var sqlite3 = require('sqlite3').verbose();

    console.Error = function (label, err) {
        console.error("\033[31m",label,"\033[0m",err)
    }

    this.connect = function () {
        this.db = new sqlite3.Database('db/chatroom.db');
    }
    this.close = function () {
        this.db.close(function (err) {
            if (err)
                console.Error("database close error: ", err)
        });
    }

    this.add_user = function (user) {
        this.connect();
        var query = "INSERT INTO `users`(username) VALUES(?)";
        console.log("add_user: ",query, user);
        this.db.run(query, user, function (err) {
            if (err)
                console.Error("Insert user err: ", err);
        });
        this.close()
    }

    this.add_talk = function (data, callback) {
        this.connect();
        var query = "INSERT INTO `talk` (fromuser, touser, text, time) VALUES($fromuser, $touser, $text, $time)";
        this.db.run(query, {
            $fromuser: data.from,
            $touser: data.to,
            $text: data.msg,
            $time: data.time
        }, function (err) {
            if (err)
            console.Error("Add talk error: ", err)
            callback(err, this.lastID)
        })
        this.close()
    }

    this.get_talk = function (fromuser, touser, callback) {
        this.connect();
        var query ="";
        if(touser == 'all'){
        query = "SELECT * FROM `talk` WHERE touser = 'all'";
        console.log("Get talk query:",query)
        this.db.all(query,function (err, rows) {
            if (err)
                console.Error("Get talk error: ", err)
            callback(err, rows)
        })
        this.close()
      }else{
        query = "SELECT * FROM `talk` WHERE (fromuser =? AND touser=? )OR( touser =? AND fromuser =?)";
        console.log("Get talk query:",query)
        //console.log(fromuser);
        //console.log(touser);
        this.db.all(query,fromuser,touser,fromuser,touser,function (err, rows) {
            if (err)
                console.Error("Get talk error: ", err)
            callback(err, rows)
        })
        this.close()
      }
    }

    return this;
}

module.exports = DBHandler;
