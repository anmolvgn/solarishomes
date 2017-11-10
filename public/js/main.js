
$(function(){  

    $(".button-collapse").sideNav();

    $("#login").on('click',function(event){
        var creds = document.getElementById('user').val().trim();
        console.log(creds)
         event.preventDefault()
     $.ajax({
           url: '/login',
         method: 'POST'
         }).done(function(ans){
           console.log('going to authenticate...');
        })
     });

     $('#createUser').on('click',function(event){
         console.log(req.body);
        event.preventDefault()
          $.ajax({
            url: '/userSetup',
             method: 'POST'
          }).done(function(ans){
            console.log('routing to new user form');
          })
      }) 
      //AVG SOLAR POTENTIAL BY MONTH
var myNodelist = document.getElementsByName("node");
var solarChartData = [];
// console.log(myNodelist.length);
//console.log(myNodelist);
myNodelist.forEach(function(item){
 // console.log(item.innerText);
  solarChartData.push(item.innerText);
})
solarChartData.splice(0,1,);
solarChartData.splice(12,2);
//console.log(solarChartData);  
//end avg solar
//AVE COST DATA BY MONTH
var myCostNodelist = document.getElementsByName("costNode");
var costChartData = [];
//console.log(myCostNodelist.length);
// console.log(myCostNodelist);
myCostNodelist.forEach(function(item){
//   console.log(item.innerText);
  costChartData.push(item.innerText);
})
costChartData.splice(0,2);
costChartData.splice(12,3);
// console.log(costChartData);
costSavings = [];
for(i = 0; i< solarChartData.length; i++) {
    savings = parseInt(solarChartData[i]) * (parseInt(costChartData[i])/100);
    console.log(savings);
    costSavings.push(savings);
}
// console.log(costSavings);

var sunData = $("#KwhAc");
console.log(sunData);    
var sunChart = $("#KwhAc");
var acChart = new Chart(sunChart, {
    type: 'bar',
    data: {
        labels: ["Jan", "Feb", "April", "March", "May", "June","Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
        datasets: [{
            label: 'Kwh AC Output',
            data: solarChartData,
            // backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            // borderColor: ['rgba(255,44,33,1)'],
            borderWidth: 1
        }]
    },
     options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
            display: true
        },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    })


var costChart = $("#costSavings");
var myChart = new Chart(costChart, {
    type: 'bar',
    data: {
        labels: ["Jan", "Feb", "April", "March", "May", "June","Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
        datasets: [{
            label: 'Total Cost Savings',
            data: costSavings,
            // backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            // borderColor: ['rgba(255,44,33,1)'],
            borderWidth: 1
        }]
    },
    options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
            display: true
        },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        callback: function(value, index, values) {
                            return '$' + Math.round(value,0);
                        }
                    }
                }]
            }
        }
    })
});
    