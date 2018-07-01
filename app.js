var express = require('express')
var app = express()

var http = require('http');
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

var expressMongoDb = require('express-mongo-db');

var config = require('./config')
app.use(expressMongoDb(config.database.url));


app.set('view engine', 'ejs')


var index = require('./routes/index')
var users = require('./routes/users')


var expressValidator = require('express-validator')
app.use(expressValidator())

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var methodOverride = require('method-override')

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))


var flash = require('express-flash')
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser('keyboard cat'))
app.use(session({ 
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}))
app.use(flash())


var auth = function(req, res, next) {
    if (req.session && req.session.user === "admin" && req.session.admin) {
        //
        console.log("there : 200");
        return next();
    } else {
        console.log("there is a prob : 401");
        // return  res.status(401).send();
        return res.redirect("/");

    }

};

// Login endpoint
app.get('/login', function (req, res) {
    if (!req.query.username || !req.query.password) {
        res.send('login failed');

    } else if(req.query.username === "admin" && req.query.password === "admin") {
        req.session.user = "admin";
        req.session.admin = true;
        res.redirect("/users");

    }
});

// Logout endpoint
app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect("/");
});





app.use('/',index)
app.use('/users',auth, users)

app.listen(3001, function(){
	console.log('Server running at port 3000: http://127.0.0.1:3001')
})
