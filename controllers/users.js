
var db = require('../models');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var httpResponse = require('express-http-response');
var Router = require('router');
var bodyParser = require('body-parser');
var routes = require('./api-routes');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

var users = Router();
          //post of new user info.
    users.post('/userSetup',[
        check('username', 'username is required').isEmpty().trim(),
        check('name', 'name is required').isEmpty().trim(),
        check('password','password must be at least 6 char').isEmpty().isLength({min: 6}),
        check('email', 'must be an email').isEmail().trim(),
        check('passwordConfirmation', 'password confirmatin field must match password' ).exists().custom((value, { req }) => value === 
        req.body.password)], function(req,res, next){ 
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(422).render('register',{ errors: errors.mapped() });
            }
            // matchedData returns only the subset of data validated by the middleware
            const user = matchedData(req);
            createUser(user).then(user => res.json(user));
          });
//         var name = req.body.name.toString();   
//         var email = req.body.email.toString();
//         var password = req.body.password.toString();
//         var username = req.body.username.toString();
//         var user = JSON.stringify(req.body);
//     db.Users.create({
//         name: name, 
//         email: email, 
//         username: username,
//          password: password})
//          .then((user)=> {
//             console.log(user.get({
//                 plain: true
//             }))
//             //register and not /
//         res.redirect('/register');
//         });
//     console.log('user form submit get request')
    
// })
//USER AUTHENTICATION - local strategy
passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log('user name = ', username);
      db.Users.findOne({ where: {username: username} }).then(function(err, user) {
            console.log('function run');    
        if (err) { 
                console.log(err);
                return done(err); 
            } else if (!user) {
                console.log(username);
                return done(null, false, { message: 'Incorrect username.' });
            } else if (user.password !== password) {
                console.log(password + ' & ' + user.password);
                return done(null, false, { message: 'Incorrect password.' });
            } else {
                console.log('success');
                return done(null, user);
            }
        });
    }
));


users.post('/login',
passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true })
);

passport.serializeUser(function(user, done) {
    done(null, user.id);
    console.log(user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
    done(err, user);
    console.log(user);
    });
});

module.exports = users;




//END -- -AUTHENTICATION GROUP 