var db = require('../models');
// var express = require('express');
// var passport = require('passport');
var Router = require('router');
var bodyParser = require('body-parser');
var request = require('request');

var router = Router();
    //home route
    router.get('/', function (req, res) {
        res.render('home');
    });
    //SOLAR DATA API
    router.post('/solarData',function(req,res){
        console.log(JSON.stringify(req.body));
        var address = req.body.city + ','+ req.body.state, losses = parseInt(req.body.losses), tilt = parseInt(req.body.tilt),azimuth = parseInt(req.body.azimuth), module_type = parseInt(req.body.module_type), array_type = parseInt(req.body.array_type), system_capacity = parseInt(req.body.system_capacity);
        var key = 'qmVVrtllpIclFnaKUH3KayluRYB1bjnvZFOtgUAu';
        var query = 'https://developer.nrel.gov/api/pvwatts/v5.json?api_key='+key+'&address='+address+'&system_capacity='+system_capacity+'&azimuth='+azimuth+'&tilt='+tilt+'&array_type='+array_type+'&module_type='+module_type+'&losses='+losses
        // console.log(query);
        // request for Solar Radiation data//
        query = 'https://developer.nrel.gov/api/pvwatts/v5.json?api_key=qmVVrtllpIclFnaKUH3KayluRYB1bjnvZFOtgUAu&address=Broomfield,Colorado&system_capacity=4&azimuth=180&tilt=0&array_type=2&module_type=1&losses=14'
            request(query, (err, res, body) => {
                if (err) { return console.log(err); }
                    body = JSON.parse(body);
                    var ac_monthly = body.outputs.ac_monthly;
                    var cals = [`jan`,`feb`,`mar`,`apr`,`may`,`jun` ,`jul`,`aug`,`sep`,`oct`,`nov`,`dec`];
                    var objData = {};
                for(i = 0; i < ac_monthly.length; i++) {
                    key = cals[i].toString();
                    value = Math.round(ac_monthly[i]).toString();
                    objData[key] = value;
                }
                // console.log(objData);
                    db.SolarData.create(objData).then(function(solarData){ 
                    })
            });
           
            db.SolarData.findOne({}).then(function(solarData){
                // console.log('rirst' + solarData);
                // console.log(JSON.stringify(solarData));
            solarData = JSON.parse(JSON.stringify(solarData));
            console.log(solarData);
                //  var dataObject = {
                // sunData: solarData
                // }
console.log(req.body.state);
            db.CostData.findOne({where: {state: 'Colorado'}}).then(function(costData){
                console.log(JSON.stringify(costData));
                costData = JSON.parse(JSON.stringify(costData));
                console.log(costData);
                 var data = {
                    sunData: solarData,
                    avgCostData: costData
                }
                console.log(data);
                // res.writeHead(200, { 'Content-Type': 'text/plain' });                
                res.render('home', data); 
            }); 
        // res.render('home', dataObject, costDataObject);     
            });        
    }); 
                ///STOP STOP STOP///
        //    router.get('/getData',function(req, res){
         
                      
        //    });  

                //     db.SolarData.findOne({}).then(function(solarData){
                //         solarData = JSON.stringify(solarData);
                        
                // console.log('this is solarData' +solarData);
     // END SOLAR DATA API

// END GET DATA..//

    router.get('/login',function(req,res){
        console.log('login get request')
        res.render('login');
    })
    router.post('/authVeriphyIng', function(req, res){
        var user = body.user;
        var password = body.password;
        console.log(user +' ' + password);
    })
    router.get('/register',function(req,res){
        console.log('register get request')
        res.render('register');
    })
    router.get('/products',function(req,res){
        console.log('products get request')
        res.render('products');
    })
    router.post('/newUserSetup', function(req,res){
        res.render('/register');
    })

module.exports = router;
