var express = require('express');
var exphbs  = require('express-handlebars');
var passport = require('passport');
var bodyParser = require('body-parser');
var routes = require('./controllers/api-routes')
var request = require('request');
var db = require('./models');

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use('/',routes);

db.sequelize.sync({}).then(function(){
   app.listen(port,function(err){
    if(err) throw err;
    console.log('Listening on port: ' + port);
}); 
})
