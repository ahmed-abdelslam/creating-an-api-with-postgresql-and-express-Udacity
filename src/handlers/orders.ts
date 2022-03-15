import express, {Request, Response} from 'express';
import {Order, OrderStore} from '../models/order';
import { verifyAuthToken } from '../middlewares/verifyAuthToken';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
    try {
        const orders = await store.index();
        res.json(orders);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const order = await store.show(req.params.id);
        res.json(order);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            status: req.body.status,
            user_id: req.body.user_id
        }

        const newOrder = await store.create(order);
        res.json(newOrder);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            status: req.body.status,
            user_id: req.body.user_id
        }

        const updatedOrder = await store.update(order, req.params.id);
        res.json(updatedOrder);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const destroy = async (req: Request, res: Response) => {
    try {
        const deletedOrder = await store.delete(req.params.id);
        res.json(deletedOrder);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const addProduct = async (req: Request, res: Response) => {
    const orderId: string = req.params.id;
    const productId: string = req.body.productId;
    const quantity: number = parseInt(req.body.quantity);

    try {
        const addedProduct = await store.addProduct(quantity, orderId, productId);
        res.json(addedProduct);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const getCurrentOrdersByUserId = async (req: Request, res: Response) => {
    const userId: string = req.params.user_id;

    try {
        const orders = await store.getCurrentOrdersByUserId(userId);
        res.json(orders);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const orderRoutes = (app: express.Application) => {
    app.get('/orders', verifyAuthToken, index);
    app.get('/orders/:id', verifyAuthToken, show);
    app.post('/orders', verifyAuthToken, create);
    app.put('/orders/:id', verifyAuthToken, update);
    app.delete('/orders/:id', verifyAuthToken, destroy);

    app.get('/orders/user/:user_id', verifyAuthToken, getCurrentOrdersByUserId);

    app.post('/order/:id/products', verifyAuthToken, addProduct);
}

export default orderRoutes;