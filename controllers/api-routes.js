var db = require('../models');
var Router = require('router');
var bodyParser = require('body-parser');
var request = require('request');

var router = Router();
    // home route
    router.get('/', function (req, res) {
        pageLoad();
        res.render('home',data);
    });
    router.get('/products',function(req,res){
        console.log('products get request')
        db.Products.findAll({}).then(function(items){
            var productList = {
                products: items
            }
            console.log(productList);
        res.render('products', productList);
        })
    })
    // createUser
    router.get('/loginPage',function(req,res){ // routes to login page
        console.log('routing to login page - api-routes')
        res.render('login');
    })
    router.get('/register',function(req,res){ //routes to registration page
        console.log('routing to REGISTRATION page')
        res.render('register');
    })
    //SOLAR DATA API
    router.post('/solarData',function(req,res){
        var city = req.body.city;
        var state = req.body.state.toString();
        var address = city + ','+ state;
        console.log(address);
        query = 'https://developer.nrel.gov/api/pvwatts/v5.json?api_key=qmVVrtllpIclFnaKUH3KayluRYB1bjnvZFOtgUAu&address='+address+'&system_capacity=4&azimuth=180&tilt=0&array_type=2&module_type=1&losses=14';
        var ac_monthly = [];
        var total = 0;  
        if (city === '' && state === '') {
            query = 'https://developer.nrel.gov/api/pvwatts/v5.json?api_key=qmVVrtllpIclFnaKUH3KayluRYB1bjnvZFOtgUAu&address=Denver,CO&system_capacity=4&azimuth=180&tilt=0&array_type=2&module_type=1&losses=14';
        } else {
            query = 'https://developer.nrel.gov/api/pvwatts/v5.json?api_key=qmVVrtllpIclFnaKUH3KayluRYB1bjnvZFOtgUAu&address='+address+'&system_capacity=4&azimuth=180&tilt=0&array_type=2&module_type=1&losses=14';
        }
            request(query, (err, res, body) => {
                if (err) { return console.log(err); }
                    body = JSON.parse(body);
                    // console.log(body);
                    ac_monthly = body.outputs.ac_monthly;
                    var cals = [`jan`,`feb`,`mar`,`apr`,`may`,`jun` ,`jul`,`aug`,`sep`,`oct`,`nov`,`dec`];
                    var objData = {};
                for(i = 0; i < ac_monthly.length; i++) {
                    key = cals[i].toString();
                    value = Math.round(ac_monthly[i]).toString();
                    objData[key] = value;
                    total += ac_monthly[i];
                }
               console.log(ac_monthly);
                    db.SolarData.create(objData).then(function(solarData){ 
                        console.log('solar data id' , solarData.dataValues.id);
                        var id = solarData.dataValues.id;
                        maxId(id);
                    })
                });
                
            var maxId = function(id) {
                rowId = id;
                // console.log(rowId);               
                db.SolarData.findById(rowId).then(function(solarData){
                    console.log(solarData.dataValues);
                    var solData = solarData.dataValues;
                    for(i = 1; i < solarData.length; i++) {
                        value = parseInt(Math.round(solarData[i]));
                        total += value;
                        console.log('TOTAL SOLAR is', value);
                    }
                        var avgEnergy = total/solarData.length;
                        avgEnergy = parseInt(avgEnergy);
                        console.log('AVERAGE ENERGY is', avgEnergy);
                        solarData = JSON.parse(JSON.stringify(solarData));
                db.CostData.findOne({where: {state: state}}).then(function(costData){
                    console.log(JSON.stringify(costData.dataValues));
                    for( var i = 0; i < costData.length; i++ ){
                        console.log('COSTDATA loop ' ,costData[i]);
                        total += parseInt(costData[i]);
                        console.log('TOTAL', total) 
                    }
                        console.log('TOTA cost is ' +total);
                        totalCostSaved = Math.round(total);
                        var avgCost = parseInt(total)/parseInt(costData.length);
                        avgCost = parseInt(avgCost);
                        console.log('avgCost is ', avgCost);
                        costData = JSON.parse(JSON.stringify(costData));
                    // console.log(costData);
                        var data = {
                            sunData: solarData,
                            costData: costData,
                            state: state,
                            city: city,
                            totalCostSavings: avgCost,
                            avgEnergy: avgEnergy
                        }
                    res.render('home', data); 
                }); 
                });                   
            }    
    }); 
    ///DEFAULT ON PAGE LOAD//
    pageLoad = function() {
        var costData = ['6','CO',10.97,11.26,11.35,11.78,11.67,12.56,12.43,12.79,12.78,12.01,12.16,12.02,11.98,'NULL','NULL'];
        
        var solarData = ['id','339','390','629','713','801','813','781','741','635',	'511','357','309','NULL','NULL'];
        var state = 'CO';
        var city = 'Denver';
        costData = JSON.parse(JSON.stringify(costData));
        
        data = {
            sunData: solarData,
            costData: costData,
            state: state,
            city: city
        }
        return data;
    };

// END GET DATA..//
module.exports = router;
