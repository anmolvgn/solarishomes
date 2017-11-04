
$(document).ready(function(){
//login
    $('#loginPage').on('click',function(){
                $.get('/loginPage',function(data,status){
                    console.log('login pressed');
                })
    })
//even listener / on click /form submit


    
    });