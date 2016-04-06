var express = require('express');
var router = express.Router();
var moment = require('moment');
var request = require('request');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('ssnoc.performance.db')

var getCount = 0
var postCount = 0

router.get('/', function(req, res, next){
    res.render('performance', {title: 'Test Framework performance', usernow: req.session.user.username})
})

router.post('/', function(req, res, next){
    var duration = parseInt(req.body.duration) * 1000
    var interval = parseInt(req.body.interval)
    var username = req.session.user.username
    db.serialize(function(){
        db.exec("DROP TABLE test;")
        db.exec("CREATE TABLE test(content TEXT, time TEXT);")
    });
    var timer = setInterval(sendRequest, interval)
    var stop = setTimeout(function(){
        clearInterval(timer);
        db.close();
        var total = duration/1000
        res.render('performanceresult', {gCount: getCount/total, pCount: postCount/total, usernow: username});
    }, duration);
    
})

function sendRequest(duration){
    if (postCount == 1000) {
        db.serialize(function(){
            db.exec("DROP TABLE test;");
            db.exec("CREATE TABLE test(content TEXT, time TEXT);");
        });
    }
    if (postCount%2 == 0){
            request.post(
                'http://127.0.0.1:3000/performance/msg/wearegoodgirlsbbbbbbbbb',
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        postCount += 1
                    }
                }
            )       
    } else {
            request.get(
                'http://127.0.0.1:3000/performance/msg',
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        postCount += 1
                        getCount += 1
                    }
                }
            )        
    }
}

router.get('/msg', function(req, res, next){
    db.run("SELECT * FROM test", function(docs){
        res.send("SUCCESS GET");
    });
})

router.post('/msg/:content', function(req, res, next){
    var time = moment().format('MMMM Do, h:mm:ss a')
    var content = req.params.content
    var query = "INSERT INTO `test` (content, time) VALUES($content, time)"
    db.run(query, {$content: content, $time: time}, function(err){
        res.send("SUCCESS POST");
    })
});

module.exports = router;
