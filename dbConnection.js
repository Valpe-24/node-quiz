const mysql = require('mysql2');

// create pool or connection
exports.pool = mysql.createPool(
    {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password:'Ositodepeluche1224!',
        database: 'sql-exam',
    }).promise()