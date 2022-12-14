import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import user_routes from './handlers/users';
import product_routes from './handlers/products';
import orders_routes from './handlers/orders';

const app: express.Application = express()
const address: string = "127.0.0.1:3000"

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

user_routes(app);
product_routes(app);
orders_routes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app;
