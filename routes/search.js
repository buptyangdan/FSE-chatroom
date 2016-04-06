var express = require('express');
var router = express.Router();
var dbhandler = new Object();
var sqlite3 = require('sqlite3').verbose();
var dbName = 'ssnoc.dev.db';
var stopWords = ['a','able','about','across','after','all',
    'almost','also','am','among','an','and','any','are','as','at',
    'be','because','been','but','by','can','cannot','could','dear','did',
    'do','does','either','else','ever','every','for','from','get','got','had',
    'has','have','he','her','hers','him','his','how','however','i','if','in',
    'into','is','it','its','just','least','let','like','likely','may','me',
    'might','most','must','my','neither','no','nor','not','of','off','often',
    'on','only','or','other','our','own','rather','said','say','says','she',
    'should','since','so','some','than','that','the','their','them','then',
    'there','these','they','this','tis','to','too','twas','us','wants','was',
    'we','were','what','when','where','which','while','who','whom','why',
    'will','with','would','yet','you','your'];
const SELECT_USER_FOR_SEARCH = "SELECT status, loggedin, username FROM Users WHERE ";
const USER_ORDER_CLAUSE = "ORDER BY loggedin DESC, username COLLATE NOCASE ASC";
const SELECT_ANNOUNCE_FOR_SEARCH = "SELECT content, username, timestamp, a.location FROM Announcements a LEFT JOIN Users u ON a.UserId = u.id WHERE ";
const ANNOUNCE_ORDER_CLAUSE = "ORDER BY timestamp DESC";
const SELECT_MESSAGE_FOR_SEARCH = "SELECT content, username, timestamp FROM Posts p LEFT JOIN Users u ON p.UserId = u.id WHERE ";
const SELECT_PRIVATE_MESSAGE_FOR_SEARCH = "SELECT content, username, timestamp FROM Chats c LEFT JOIN Users u ON c.from_user = u.id WHERE ";

console.Error = function (label, err) {
    console.error("\033[31m",label,"\033[0m",err)
};

// Set dbName for performance and memory measurement
dbhandler.setDB = function (name) {
    dbName = name;
};
// connect to database
dbhandler.connect = function () {
    dbhandler.db = new sqlite3.Database(dbName);
};

// close the datablse
dbhandler.close = function () {
    dbhandler.db.close(function (err) {
        if (err)
            console.Error("database close error: ", err)
    });
};

dbhandler.executeSelect = function (query, whereValues, callback) {
    dbhandler.connect();
    dbhandler.db.all(query, whereValues, function(err, rows) {
        if (err) {
            console.Error("DB select errors: ", err);
        }
        else {
            err = null;
        }
        callback(err, rows);
    });
    dbhandler.close();
};

function filterCriteria(criteria) {
    var listOfCriteria = criteria.split(" ");
    var listofValidCriteria = [];
    for (i = 0; i < listOfCriteria.length; i++) {
        if (stopWords.indexOf(listOfCriteria[i]) == -1) {
            listofValidCriteria.push(listOfCriteria[i]);
        }
    }
    return listofValidCriteria;
}

function searchUserByUsername(username, callback) {
    var whereClause = "username like '%" + username + "%' " + USER_ORDER_CLAUSE;
    var userlist = new Array();
    dbhandler.executeSelect(SELECT_USER_FOR_SEARCH + whereClause, [], function (err, rows) {
        if (err) {
            console.error("search err: " + err);
        }
        else {
            err = null;
            for(var i=0; i<rows.length; i++)
            {
                var user = new Object();
                user.username = rows[i].username;
                user.online = rows[i].loggedin;
                user.status = rows[i].status;
                userlist.push(user);
            }
        }
        return callback(err, userlist);
    });
}

function searchUserByStatus(status, callback) {
    var whereClause = "status = '" + status + "' " + USER_ORDER_CLAUSE;
    var userlist = new Array();
    dbhandler.executeSelect(SELECT_USER_FOR_SEARCH + whereClause, [], function (err, rows) {
        if (err) {
            console.error("search error: " + err);
        }
        else {
            // console.log("searchByStatus", SELECT_USER_FOR_SEARCH, whereClause);
            err = null;
            for(var i=0; i<rows.length; i++)
            {
                var user = new Object();
                user.username = rows[i].username;
                user.online = rows[i].loggedin;
                user.status = rows[i].status;
                userlist.push(user);

            }
        };
        callback(err, userlist);
    });
};

function searchAnnouncementByKeywords(criteria, offset, callback) {
    var announcementList = new Array();
    var keywordsClauses = criteria.map(function(word) {
        return "content LIKE '%" + word + "%'";
    });
    var whereClause = keywordsClauses.join(" AND ") + " " + ANNOUNCE_ORDER_CLAUSE + " LIMIT 10 "+ "offset " + offset  ;
    dbhandler.executeSelect(SELECT_ANNOUNCE_FOR_SEARCH + whereClause, [], function (err, rows) {
        if (err) {
            console.error("search announcement error: " + err);
            console.log(SELECT_ANNOUNCE_FOR_SEARCH + whereClause);
        }
        else {
            console.log("searchByKeywords", SELECT_ANNOUNCE_FOR_SEARCH, whereClause);
            err = null;
            for(var i=0; i<rows.length; i++)
            {
                var announcement = new Object();
                announcement.content = rows[i].content;
                announcement.timestamp = rows[i].timestamp;
                announcement.location = rows[i].location;
                announcement.username = rows[i].username;
                announcementList.push(announcement);
            }
        }
        callback(err, announcementList);
    })
}

function searchPublicChatByKeywords(criteria, offset, callback) {
    var messageList = new Array();
    var keywordsClauses = criteria.map(function(word) {
        return "content LIKE '%" + word + "%'";
    });
    var whereClause = keywordsClauses.join(" AND ") + " " + ANNOUNCE_ORDER_CLAUSE + " LIMIT 10 " + "offset " + offset ;
    dbhandler.executeSelect(SELECT_MESSAGE_FOR_SEARCH + whereClause, [], function(err, rows){
        if(err) {
            console.log(SELECT_MESSAGE_FOR_SEARCH + whereClause);
            console.error("search message error: " + err);
        }
        else {
            console.log(SELECT_MESSAGE_FOR_SEARCH + whereClause);
            err = null;
            for(var i=0; i<rows.length; i++)
            {
                var message = new Object();
                message.username = rows[i].username;
                message.content = rows[i].content;
                message.timestamp = rows[i].timestamp;
                messageList.push(message);
            }
        }
        callback(err, messageList);
    })
}

function searchPrivateChatByKeywords(criteria, offset, callback) {
    var messageList = new Array();
    var keywordsClauses = criteria.map(function(word) {
        return "content LIKE '%" + word + "%'";
    });
    var whereClause = keywordsClauses.join(" AND ") + " " + ANNOUNCE_ORDER_CLAUSE + " LIMIT 10 " + "offset " + offset ;
    dbhandler.executeSelect(SELECT_PRIVATE_MESSAGE_FOR_SEARCH + whereClause, [], function(err, rows){
        if(err) {
            console.log(SELECT_PRIVATE_MESSAGE_FOR_SEARCH + whereClause);
            console.error("search message error: " + err);
        }
        else {
            console.log(SELECT_PRIVATE_MESSAGE_FOR_SEARCH + whereClause);
            err = null;
            for(var i=0; i<rows.length; i++)
            {
                var message = new Object();
                message.username = rows[i].username;
                message.content = rows[i].content;
                message.timestamp = rows[i].timestamp;
                messageList.push(message);
            }
        }
        callback(err, messageList);
    })
}

router.get('/', function(req, res, next){
    if (req.session.user != undefined) {
        res.render('search', {title: 'SSNoc Search', action: "/search", usernow: req.session.user.username});
    } else {
        res.redirect('/');
    }
});

router.post('/', function(req, res, next){
    var criteria = req.body.criteria;
    var type = req.body.type;
    var offset = req.body.offset;
    if (offset == null || offset.length == 0) {
        offset = 0;
    }

    console.log("criteria is " + criteria);
    console.log("type is " + type);
    if (criteria.trim().length == 0) {
        res.json({"result": new Array()});
        return
    }
    var listOfValidCriteria = filterCriteria(criteria);
    if (listOfValidCriteria.length == 0) {
        res.json({"result": new Array()});
        return
    }

    switch(type) {
        case "username":
            console.log(req.body);
            var username = criteria.trim();
            searchUserByUsername(username, function(err, result) {
                res.json({"result": result})
            });
            break;
        case "status":
            var status = criteria.trim();
            searchUserByStatus(status, function(err, result) {
                res.json({"result": result})
            });
            break;
        case "announcement":
            searchAnnouncementByKeywords(listOfValidCriteria, offset, function(err, results){
                res.json({"result": results})
            });
            break;
        case "public chat":
            searchPublicChatByKeywords(listOfValidCriteria, offset, function(err, results){
                res.json({"result": results})
            });
            break;
        case "private chat":
            searchPrivateChatByKeywords(listOfValidCriteria, offset, function(err, results){
                res.json({"result": results})
            });
            break;
        default:
            break;
    }
});

module.exports = router;