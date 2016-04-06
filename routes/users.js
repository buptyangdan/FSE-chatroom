var models = require('../models');
var express = require('express');
var router = express.Router();
const reserved_list = ['about', 'access', 'account', 'accounts', 'add', 'address', 'adm', 'admin', 'administration', 'adult', 'advertising', 'affiliate', 'affiliates', 'ajax', 'analytics', 'android', 'anon', 'anonymous', 'api', 'app', 'apps', 'archive', 'atom', 'auth', 'authentication', 'avatar', 'backup', 'banner', 'banners', 'bin', 'billing', 'blog', 'blogs', 'board', 'bot', 'bots', 'business', 'chat', 'cache', 'cadastro', 'calendar', 'campaign', 'careers', 'cgi', 'client', 'cliente', 'code', 'comercial', 'compare', 'config', 'connect', 'contact', 'contest', 'create', 'code', 'compras', 'css', 'dashboard', 'data', 'db', 'design', 'delete', 'demo', 'design', 'designer', 'dev', 'devel', 'dir', 'directory', 'doc', 'docs', 'domain', 'download', 'downloads', 'edit', 'editor', 'email', 'ecommerce', 'forum', 'forums', 'faq', 'favorite', 'feed', 'feedback', 'flog', 'follow', 'file', 'files', 'free', 'ftp', 'gadget', 'gadgets', 'games', 'guest', 'group', 'groups', 'help', 'home', 'homepage', 'host', 'hosting', 'hostname', 'html', 'http', 'httpd', 'https', 'hpg', 'info', 'information', 'image', 'img', 'images', 'imap', 'index', 'invite', 'intranet', 'indice', 'ipad', 'iphone', 'irc', 'java', 'javascript', 'job', 'jobs', 'js', 'knowledgebase', 'log', 'login', 'logs', 'logout', 'list', 'lists', 'mail', 'mail1', 'mail2', 'mail3', 'mail4', 'mail5', 'mailer', 'mailing', 'mx', 'manager', 'marketing', 'master', 'me', 'media', 'message', 'microblog', 'microblogs', 'mine', 'mp3', 'msg', 'msn', 'mysql', 'messenger', 'mob', 'mobile', 'movie', 'movies', 'music', 'musicas', 'my', 'name', 'named', 'net', 'network', 'new', 'news', 'newsletter', 'nick', 'nickname', 'notes', 'noticias', 'ns', 'ns1', 'ns2', 'ns3', 'ns4', 'old', 'online', 'operator', 'order', 'orders', 'page', 'pager', 'pages', 'panel', 'password', 'perl', 'pic', 'pics', 'photo', 'photos', 'photoalbum', 'php', 'plugin', 'plugins', 'pop', 'pop3', 'post', 'postmaster', 'postfix', 'posts', 'profile', 'project', 'projects', 'promo', 'pub', 'public', 'python', 'random', 'register', 'registration', 'root', 'ruby', 'rss', 'sale', 'sales', 'sample', 'samples', 'script', 'scripts', 'secure', 'send', 'service', 'shop', 'sql', 'signup', 'signin', 'search', 'security', 'settings', 'setting', 'setup', 'site', 'sites', 'sitemap', 'smtp', 'soporte', 'ssh', 'stage', 'staging', 'start', 'subscribe', 'subdomain', 'suporte', 'support', 'stat', 'static', 'stats', 'status', 'store', 'stores', 'system', 'tablet', 'tablets', 'tech', 'telnet', 'test', 'test1', 'test2', 'test3', 'teste', 'tests', 'theme', 'themes', 'tmp', 'todo', 'task', 'tasks', 'tools', 'tv', 'talk', 'update', 'upload', 'url', 'user', 'username', 'usuario', 'usage', 'vendas', 'video', 'videos', 'visitor', 'win', 'ww', 'www', 'www1', 'www2', 'www3', 'www4', 'www5', 'www6', 'www7', 'wwww', 'wws', 'wwws', 'web', 'webmail', 'website', 'websites', 'webmaster', 'workshop', 'xxx', 'xpg', 'you', 'yourname', 'yourusername', 'yoursite', 'yourdomain']

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users login. */
router.get('/login', function(req, res, next){
    res.render('userform', {title: 'Login for SSNoc Service', name: 'loginForm', method: '/users/login'});
});

/* POST authenite users login. */
router.post('/login', function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;
    var create = true
    if (reserved_list.indexOf(username.toLowerCase()) > -1) {
        create = false
        res.send("Invalid username, plz use another one");
    }
    if (username.length<4 || password.length<3) {
        create = false
        res.send("username at least 3 chars, password at least 4 chars");
    }
    if (create) {
        models.User.findOrCreate({
            where: {username: username},
            defaults: {password: password}
        }).spread(function(user, created){
            if (user && user.password == password){
                user.loggedin = true;
                user.save().then(function(){
                    req.session.user = user;
                    res.redirect('/main');
                });
            } else {
                res.send('username or password is wrong, plz try again');
            }
        });
    }
});

/* GET users logout. */
router.get('/logout', function(req, res, next){
    models.User.findOne({where: {username: req.session.user.username}}).then(function(user){
        user.loggedin = false;
        user.save().then(function(){
            req.session.user = undefined;
            res.redirect('/');
        });
    });
});

router.get('/status', function(req, res, next){
    res.render('status', {title: 'Setup your status', name: 'statusForm', method: '/users/status', usernow: req.session.user.username });
});

router.post('/status', function(req, res, next){
    var username = req.session.user.username
    var status = req.body.status
    var location = req.body.location
    models.User.findOne({where: {username: username}}).then(function(user){
        user.status = status;
        user.location = location;
        user.save().then(function(){
            res.redirect('/main');
        });
    });
});

module.exports = router;
