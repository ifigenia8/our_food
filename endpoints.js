const fastify = require('fastify')()

//fastify.register(require('@fastify/mysql'))
const mysql = require('mysql');
const connection = require('./db.js');


async function goodsRoutes(fastify, options) {

    //GET DATA
    fastify.get('/goods', function (request, reply) {
        connection.query(
            'SELECT * FROM our_food.goods',
            function (error, results) {
                if (error) {
                    console.error(error)
                    return reply.send(error)
                }
                reply.send(results)
            }
        )
    })

    //ADD
    fastify.post('/goods', async (request, reply) => {
        try {
            // Get the data from the request body
            const { name, barcode } = request.body

            // Insert the new item into the database
            const query = `INSERT INTO our_food.goods (name, barcode) VALUES ("${name}","${barcode}")`

            connection.query(
                query,
                function (error, results) {
                    if (error) {
                        console.error(error)
                        return reply.send(error)
                    }

                    // Return the new item with its ID
                    const newItem = {
                        id: results.insertId,
                        name,
                        barcode
                    }
                    reply.send(newItem)
                }
            )
        } catch (error) {
            console.error(error)
            return reply.send(error)
        }
    })

    //BARCODE
    fastify.get('/goods/:barcode', function (req, reply) {

        connection.query(
            `SELECT * FROM our_food.goods WHERE our_food.goods.barcode =${req.params.barcode}`,
            function (err, result) {
                reply.send(err || result)
            }
        )
    })
}


module.exports = goodsRoutes

