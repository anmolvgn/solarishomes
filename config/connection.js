const mySql = require('mysql');

if (process.env.JAWSDB_URL) {
	connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    var connection = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'solar_db'
})
}
//connect and handle err/success. 
// connection.connect(function(err){
//     if(err) {
//         console.error('error connecting: '+ err.stack);
//         return;
//     }
//     console.log('connected as id' + connection.threadId);
// });

module.exports = connection;