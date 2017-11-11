var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();
var db = require('./models');
var httpResponse = require('express-http-response');
var passport = require('passport');
var Handlebars     = require('handlebars');
var HandlebarsIntl = require('handlebars-intl');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var users = require('./controllers/users');
var routes = require('./controllers/api-routes');
var request = require('request');
var flash = require('connect-flash');
const expressValidator = require('express-validator');


// console.log(require);
var port = process.env.PORT || 8000;

HandlebarsIntl.registerWith(Handlebars);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));

app.use(cookieParser());
app.use(session({ secret: "cats",
    resave: false, 
    saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(expressValidator());

app.use('/',routes);
app.use('/',users);


db.sequelize.sync({}).then(function(){
   app.listen(port,function(err){
    if(err) throw err;
    console.log('Listening on port: ' + port);
}); 
});

