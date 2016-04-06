var models = require('../models');
var express = require('express');
var router = express.Router();
var moment = require('moment');

router.get('/', function(req, res, next){
    if (req.session.user != undefined) {
        models.Announcement.findAll({include: {model: models.User, as: 'User'}}).then(function(announcements){
            res.render('announcement', {title: 'SSNoc Post Announcements', action: "/announcement", usernow: req.session.user.username, announcements: announcements})
        });
    } else {
        res.redirect('/');
    }
})

router.post('/', function(req, res, next){
    models.Announcement.create({
        UserId: req.session.user.id,
        content: req.body.content,
        timestamp: moment().format('MMMM Do, h:mm:ss a'),
        location: req.body.location
    }).then(function(){
        res.redirect('/announcement');
    });
});

module.exports = router;
