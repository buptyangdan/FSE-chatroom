var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/chatroom.db');

db.serialize(function() {

    db.exec("DROP TABLE IF EXISTS users;DROP TABLE IF EXISTS talk;")
    db.exec("CREATE TABLE users(userid integer primary key, username varchar(20));");
    db.exec("CREATE TABLE talk(talkid integer primary key, fromuser varchar(20), touser varchar(20), text TEXT, time TEXT);");
});
db.close();
