const mysql = require('mysql');
const fastify = require('fastify')()
const connection = require('./db.js');
const goodsRoutes = require('./endpoints.js');
fastify.register(goodsRoutes);



fastify.get('/', async (request, reply) => {
  return { message: 'Hello, world!' };
});


// create a new table
const createTable = `
  CREATE TABLE IF NOT EXISTS our_food.goods (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    barcode INT NOT NULL
  );
`;

// create a new database
connection.query('CREATE DATABASE IF NOT EXISTS our_food', (err, result) => {
  if (err) throw err;
  console.log('Database created!');
});
connection.query(createTable, function (error, results, fields) {
  if (error) throw error;
  console.log('Table created successfully');
});


fastify.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});

//module.exports = connection;





