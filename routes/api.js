/**
 * Created by danyang on 3/2/16.
 */
var models = require('../models');
var express = require('express');
var router = express.Router();
var moment = require('moment');
var request = require('request');
var sqlite3 = require('sqlite3').verbose();
var dbhandler = new Object();
var multer = require('multer');

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads');
  },
  filename: function (req, file, callback) {
    var fileName = Date.now() + "." + file.originalname.split('.')[1];
    var fromId = req.session.user.id;

    dbhandler.updatePicture(fileName, fromId, function(err, rows){
      callback(null, fileName);
    });
  }
});
var upload = multer({ storage : storage}).single('userPhoto');

router.post('/photo', function(req,res){
  var fromId = req.session.user.id;
  
  upload(req,res,function(err) {
    if(err) {
      return res.end("Error uploading file.");
    }
    res.redirect("/profile/" + fromId);
  });
});

console.Error = function (label, err){
  console.error("\033[31m",label,"\033[0m",err)
}

dbhandler.connect = function () {
  dbhandler.db = new sqlite3.Database('ssnoc.dev.db');
  dbhandler.db.configure("busyTimeout", 2000);
}
dbhandler.close = function () {
  dbhandler.db.close(function (err) {
    if (err)
      console.Error("database close error: ", err)
  });
}

dbhandler.updatePicture = function(picture, id, callback){
  dbhandler.connect();
  var query = "UPDATE Users SET picture=? WHERE id=?";

  dbhandler.db.all(query, picture, id, function (err, rows) {
    if (err){
      console.Error("Update picture error: ", err)
    }
    callback(err, rows)
  });
  this.close()
}

dbhandler.get_talk = function (from, to, callback) {
  dbhandler.connect();
  var query = "SELECT * FROM `Chats` WHERE (from_user =? AND to_user=? )OR(to_user =? AND from_user =?)";

  dbhandler.db.all(query,from,to,from,to,function (err, rows) {
    if (err)
      console.Error("Get talk error: ", err)
    callback(err, rows)
  });
  this.close()
}

router.get('/privatetalks', function (req, res) {
      var from = req.query.fromId
  var to = req.query.toId

  dbhandler.get_talk(from, to, function (err, post) {
    if (!err){
      res.json(post);
    }
  });
});

module.exports = router;
