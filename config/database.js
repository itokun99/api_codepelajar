var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    port: 8888,
    database: 'codepelajar',
    user: 'root',
    password: 'root',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

try {
    conn.connect(function(error){
        if(error) throw error;
    });
} catch (error){
    console.log(error)
}

module.exports = conn;