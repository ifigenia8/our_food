import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import connection from './db';

interface Goods {
    id?: number;
    name: string;
    barcode: string;
}


async function goodsRoutes(fastify: FastifyInstance, options: any) {
    //GET DATA
    fastify.get('/goods', function (request: FastifyRequest, reply: FastifyReply) {
        connection.query(
            'SELECT * FROM our_food.goods',
            function (error: Error, results: Goods[] | undefined) {
                if (error) {
                    console.error(error);
                    return reply.send(error);
                }
                reply.send(results);
            }
        );
    });

    //ADD
    fastify.post('/goods', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            // Get the data from the request body
            const { name, barcode } = request.body as { name: string, barcode: string };

            // Insert the new item into the database
            const query = `INSERT INTO our_food.goods (name, barcode) VALUES ("${name}","${barcode}")`;

            connection.query(
                query,
                function (error: Error, results: Goods | undefined) {
                    if (error) {
                        console.error(error);
                        return reply.send(error);
                    }

                    // Return the new item with its ID
                    const newItem: Goods = {
                        id: results?.id,
                        name,
                        barcode,
                    };

                    reply.send(newItem);
                }
            );
        } catch (error) {
            console.error(error);
            return reply.send(error);
        }
    });

    //BARCODE
    fastify.get('/goods/:barcode', function (req: FastifyRequest, reply: FastifyReply) {
        const { barcode } = req.params as { barcode: string }
        connection.query(
            `SELECT * FROM our_food.goods WHERE our_food.goods.barcode =${barcode}`,
            function (err: Error, result: Goods[] | undefined) {
                reply.send(err || result);
            }
        );
    });
}

export default goodsRoutes;