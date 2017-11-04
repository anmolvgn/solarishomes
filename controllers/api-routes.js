
var db = require('../models');
var passport = require('passport');
var Router = require('router');
var bodyParser = require('body-parser');
var request = require('request');


var router = Router();
    //home route
    router.get('/', function (req, res) {
        res.render('home');
    });
    //solar data
    router.post('/solarData',function(req,res){
        console.log(JSON.stringify(req.body));
        var address = req.body.city + ','+ req.body.state;
        var losses = parseInt(req.body.losses);
        var tilt = parseInt(req.body.tilt);
        var azimuth = parseInt(req.body.azimuth);
        var module_type = parseInt(req.body.module_type);
        var array_type = parseInt(req.body.array_type);
        var system_capacity = parseInt(req.body.system_capacity);
        var key = 'qmVVrtllpIclFnaKUH3KayluRYB1bjnvZFOtgUAu'
       
        var query = 'https://developer.nrel.gov/api/pvwatts/v5.json?api_key='+key+'&address='+address+'&system_capacity='+system_capacity+'&azimuth='+azimuth+'&tilt='+tilt+'&array_type='+array_type+'&module_type='+module_type+'&losses='+losses
        console.log(query);
        // request for Solar Radiation data//
        query = 'https://developer.nrel.gov/api/pvwatts/v5.json?api_key=qmVVrtllpIclFnaKUH3KayluRYB1bjnvZFOtgUAu&address=Broomfield,Colorado&system_capacity=4&azimuth=145&tilt=44&array_type=2&module_type=1&losses=11'
        request(query, (err, res, body) => {
            if (err) { return console.log(err); }
            // ac_monthly = data.ac_monthly[0];
            body = JSON.parse(body);
                ac_monthly = body.outputs.ac_monthly;
                var cals = [`jan`,`feb`,`mar`,`apr`,`may`,`jun` ,`jul`,`aug`,`sep`,`oct`,`nov`,`dec`];
                console.log(ac_monthly);
                var objData = {};
                for(i = 0; i < ac_monthly.length; i++) {
                   console.log(cals[i]);
                   //key: valu definition es6
                   objData[cals[i]] = Math.round(ac_monthly[i]);
                
                }
        // objData = {'jan': 123.22},
            console.log(objData);
                db.SolarData.create(objData).then(function(dbAuthor){
                    res.json(dbAuthor);
                })
            
            var solRad = [];
            for(i = 0; i < ac_monthly.length; i++){
                value = Math.round(ac_monthly[i]);
                solRad.push(value);
            }
            // console.log(solRad);
                getSolarData(ac_monthly); 
            });
            getSolarData = function(ac_monthly){
                var solarData = {
                    sunData: ac_monthly
                }
              res.render('home',solarData);    
                // res.send();
            }
                        
    });

    router.get('/loginPage',function(req,res){
        console.log('testlogin')
        res.send('login');
    })
    // get login
    // app.post('/login',
    // passport.authenticate('local', { successRedirect: '/',
    //                                  failureRedirect: '/login',
    //                                  failureFlash: true })
    // );

    // passport.authenticate('local', { failureFlash: 'Invalid username or password.' });
    // passport.authenticate('local', { successFlash: 'Welcome!' });


    
module.exports = router;
