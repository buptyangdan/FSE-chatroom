var models = require('../models');
var express = require('express');
var router = express.Router();
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session.user){
        res.redirect('/main')
    } else {
        res.render('index', { title: 'SSNoc Service' });
    }
});

/* GET chat history. */
router.get('/main', function(req, res, next){
    if (req.session.user != undefined) {
        models.User.findAll().then(function(users){
          res.render('main', {title: 'SSNoc Public Chatroom', usernow: req.session.user.username, users: users})
        });
    } else {
        res.redirect('/');
    }
});

module.exports = router;
