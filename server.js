var express = require('express');
var exphbs  = require('express-handlebars');
var login = require('./controllers/login.js')
var passport = require('passport');


var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
 
app.get('/', function (req, res) {
    res.render('home');
});
 
app.listen(port,function(err){
    if(err) throw err;
    console.log('Listening on port: ' + port);
});