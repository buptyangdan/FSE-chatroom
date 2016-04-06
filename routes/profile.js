var models = require('../models');
var express = require('express');
var router = express.Router();
var moment = require('moment');
var sqlite3 = require('sqlite3').verbose();
var dbhandler = new Object();

/* Access profile database */
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
dbhandler.getProfile = function(id, callback){
  dbhandler.connect();
  var query = "SELECT * FROM Users WHERE id=?";

  dbhandler.db.all(query, id, function (err, rows) {
    if (err){
      console.Error("Get profile error: ", err)
    }
    callback(err, rows)
  });
  this.close()
}
dbhandler.updateProfile = function(firstName, lastName, address, occupation, skills, status, id, callback){
  dbhandler.connect();
  var query = "UPDATE Users SET firstName=?, lastName=?, address=?, occupation=?, skills=?, status = ? WHERE id=?";

  dbhandler.db.all(query, firstName, lastName, address, occupation, skills, status, id, function (err, rows) {
    if (err){
      console.Error("Update profile error: ", err)
    }
    callback(err, rows)
  });
  this.close()
}

/* GET someone profile*/
router.get('/:toId', function(req, res, next){
  var fromId = req.session.user.id;
  var toId = req.params.toId;
  var readonly = false;
  if (fromId != toId){
    readonly = true;
  }

  models.User.find({
    where: {id: toId}
  }).then(function(user){
    dbhandler.getProfile(toId, function (err, profile) {
      var firstName = "";
      var lastName = "";
      var address = "";
      var occupation = "";
      var skills = "";
      var picture = null;
      var status = "";

      if (profile[0].firstName != null){
        firstName = profile[0].firstName;
      }
      if (profile[0].lastName != null){
        lastName = profile[0].lastName;
      }
      if (profile[0].address != null){
        address = profile[0].address;
      }
      if (profile[0].occupation != null){
        occupation = profile[0].occupation;
      }
      if (profile[0].skills != null){
        skills = profile[0].skills;
      }
      if (profile[0].picture != null){
        picture = profile[0].picture;
      }
      if (profile[0].status != null){
        status = profile[0].status;
      }
      
      res.render('profile',
                 {title: 'SSNoc Public Chatroom',
                  username: user.dataValues.username,
                  readonly: readonly,
                  usernow: req.session.user.username,
                  to_user: user.dataValues.username,
                  fromId: fromId,
                  toId: toId,
                  firstName: firstName,
                  lastName: lastName,
                  address: address,
                  occupation: occupation,
                  skills: skills,
                  picture: picture,
                  status: status
                 });
    });
  });
});

/* Update someone's profile */
router.post('/:toId', function(req, res, next){
  var fromId = req.session.user.id;
  var toId = req.params.toId;

  if (fromId != toId){
    res.end("Not able to update the profile that isn't yours");
  }

  var firstName = "";
  var lastName = "";
  var address = "";
  var occupation = "";
  var skills = "";
  var status = "";

  if (req.body.firstName != null){
    firstName = req.body.firstName;
  }
  if (req.body.lastName != null){
    lastName = req.body.lastName;
  }
  if (req.body.address != null){
    address = req.body.address;
  }
  if (req.body.occupation != null){
    occupation = req.body.occupation;
  }
  if (req.body.skills != null){
    skills = req.body.skills;
  }
  if (req.body.status != null){
    status = req.body.status;
  }

  dbhandler.updateProfile(firstName, lastName, address, occupation, skills, status, toId, function (err, rows) {
    if (err) {console.log(err);}
    res.end("Update success");
  });
});

module.exports = router;
