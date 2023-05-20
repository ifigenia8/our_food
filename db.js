const mysql = require('mysql');


// configraration with env. 
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT, 
    database: process.env.MYSQL_DATABASE
});



// connect to the database server
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to database server!');
});


module.exports = connection;