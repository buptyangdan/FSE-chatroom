var app = require('../app');
var request = require('supertest')(app)
, express = require('express')
, assert = require('assert'),
moment = require('moment')
models = require('../models'),
login = require('./login');

describe ('Profile', function(){
  var agent;
  
  before(function(done){
    login.login(request, function(loginAgent){
      agent = loginAgent;
      done();
    });
  });
  
  it('Create new user for test', function(done){
    request
      .post("/users/login")
      .set('Accept', 'application/json')
      .send({'username': 'yangdan', 'password': 'yangdan'})
      .expect(302)
      .end(function(err, res){
        request
          .post("/users/login")
          .set('Accept', 'application/json')
          .send({'username': 'testuser', 'password': 'testuser'})
          .expect(302)
          .end(function(err, res){
            done();
          });
      });
  });
  
  it('Get profile', function(done){
    var req = request.get('/profile/1');
    agent.attachCookies(req);
    
    req.expect(200)
      .end(function(err, res) {
        if (res.text.indexOf("profileForm") > -1){
          done();
        }
      });
  });

  it('Update profile', function(done){
    var req = request.post('/profile/1');
    agent.attachCookies(req);
    
    req.send({firstName: "Rourou", lastName: "Yang"})
      .expect(302)
      .end(function(err, res) {
        if (res.text == "Update success"){
          done();
        }
      });
  });

  it('Not able to update profile that isn\'t yours', function(done){
    var req = request.post('/profile/2');
    agent.attachCookies(req);
    
    req.send({firstName: "Rourou", lastName: "Yang"})
      .expect(302)
      .end(function(err, res) {
        if (res.text == "Not able to update the profile that isn't yours"){
          done();
        }
      });
  });
});
