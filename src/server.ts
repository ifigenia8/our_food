//import fastify from 'fastify'
import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import connection from './db';
import goodsRoutes from './endpoints';

//const server = fastify()

const app: FastifyInstance = fastify();
app.register(goodsRoutes);

app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    return { message: 'Hello, world!' }
})

//create new table
const createTable: string = `
  CREATE TABLE IF NOT EXISTS our_food.goods (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    barcode INT NOT NULL
  );
`;

//create new database
connection.query('CREATE DATABASE IF NOT EXISTS our_food', (err: Error) => {
    if (err) throw err;
    console.log('Database created!');
});
connection.query(createTable, function (error: Error) {
    if (error) throw error;
    console.log('Table created successfully');
});



app.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})