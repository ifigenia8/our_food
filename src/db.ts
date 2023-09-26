import mysql, { Connection, ConnectionConfig } from 'mysql';

const connectionConfig: ConnectionConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    database: process.env.MYSQL_DATABASE
};

const connection: Connection = mysql.createConnection(connectionConfig);

connection.connect((err: Error) => {
    if (err) throw err;
    console.log('Connected to database server!');
});

export default connection;