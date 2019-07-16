var mysql = require('mysql');
var conn = mysql.createConnection({
    host : 'localhost',
    database : 'codepelajar',
    user : 'root',
    password : ''
});

conn.connect(function(error){
    if(error) throw error;
});

module.exports = conn;