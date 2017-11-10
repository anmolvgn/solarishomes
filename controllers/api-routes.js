var db = require('../models');
var Router = require('router');
var bodyParser = require('body-parser');
var request = require('request');

var router = Router();
    // home route
    router.get('/', function (req, res) {
        res.render('home');
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
        // console.log(JSON.stringify(req.body.city));
        var city = req.body.city;
        var state = req.body.state.toString();
        var address = city + ','+ state;
        // console.log(address);
        // , losses = parseInt(req.body.losses), tilt = parseInt(req.body.tilt),azimuth = parseInt(req.body.azimuth), module_type = parseInt(req.body.module_type), array_type = parseInt(req.body.array_type), system_capacity = parseInt(req.body.system_capacity);
        // var key = 'qmVVrtllpIclFnaKUH3KayluRYB1bjnvZFOtgUAu';
        // var query = 'https://developer.nrel.gov/api/pvwatts/v5.json?api_key='+key+'&address='+address+'&system_capacity='+system_capacity+'&azimuth='+azimuth+'&tilt='+tilt+'&array_type='+array_type+'&module_type='+module_type+'&losses='+losses
        // console.log(query);
        // request for Solar Radiation data//
        query = 'https://developer.nrel.gov/api/pvwatts/v5.json?api_key=qmVVrtllpIclFnaKUH3KayluRYB1bjnvZFOtgUAu&address='+address+'&system_capacity=4&azimuth=180&tilt=0&array_type=2&module_type=1&losses=14';
        // console.log(query);
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
                    total += ac_monthly[i];
                }
               
                    db.SolarData.create(objData).then(function(solarData){ 
                    })
            });
            var total = 0;                                       
            
            db.SolarData.findOne({}).then(function(solarData){
                len = solarData.length;
                console.log(len);
                for(i = 0; i < solarData.length; i++) {
                    value = parseInt(Math.round(solarData[i]));
                    total += value;
                    console.log('sum of solarData is', value);
                }
                    var avgEnergy = total/solarData.length;
                    avgEnergy = parseInt(avgEnergy);
                    console.log('avearage energy is', avgEnergy);
            solarData = JSON.parse(JSON.stringify(solarData));
            // console.log(solarData);
                //  var dataObject = {
                // sunData: solarData
                // }
            // console.log(req.body.state);
            // console.log(req.body.city);
            db.CostData.findOne({where: {state: state}}).then(function(costData){
                console.log(JSON.stringify(costData));
                for( var i = 0; i < costData.length; i++ ){
                    console.log(costData[i]);
                    total += parseInt( costData[i]);
                    console.log('TOTAL', total) 
                }
                console.log('total cost is ' +total);
                var avgCost = parseInt(total)/parseInt(costData.length);
                avgCost = parseInt(avgCost);
                console.log('avgCost is ', avgCost);
                costData = JSON.parse(JSON.stringify(costData));
                // console.log(costData);
                 var data = {
                    sunData: solarData,
                    costData: costData,
                    state: state,
                    averageCost: avgCost,
                    avgEnergy: avgEnergy
                }
                // console.log(data);
                // res.writeHead(200, { 'Content-Type': 'text/plain' });                
                res.render('home', data); 
            }); 
        // res.render('home', dataObject, costDataObject);     
            });        
    }); 
             
// END GET DATA..//

  

module.exports = router;
