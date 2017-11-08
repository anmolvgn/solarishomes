
var apiRoutes = require('../controllers/api-routes');
var db = require('../models');
passport = require('passport');
LocalStrategy = require('passport-local').Strategy;

console.log('passPortConfig');
module.exports = function(passport){
       //authentication of user input///
  passport.use(new LocalStrategy(
    //username and password passed in from form.
  function(username, password, done) {
      Users.findOne({ username: username }, function (err, user) {
          if (err) { return done(err); }
              if (!user) {
                  console.log(user);
              return done(null, false, { message: 'Incorrect username.' });
              }
                  if (!user.validPassword(password)) {
                      console.log(password);
                  return done(null, false, { message: 'Incorrect password.' });
                  }
          return done(null, user);
      });
  }
  ));
}
  

