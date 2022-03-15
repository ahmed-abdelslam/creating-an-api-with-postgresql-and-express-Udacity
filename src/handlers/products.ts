import express, {Request, Response} from 'express';
import {Product, ProductStore} from '../models/product';
import { verifyAuthToken } from '../middlewares/verifyAuthToken';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
    try {
        const products = await store.index();
        res.json(products);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const product = await store.show(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        }

        const newProduct = await store.create(product);
        res.json(newProduct);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        }

        const updatedProduct = await store.update(product, req.params.id);
        res.json(updatedProduct);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const destroy = async (req: Request, res: Response) => {
    try {
        const deletedProduct = await store.delete(req.params.id);
        res.json(deletedProduct);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const productRoutes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.put('/products/:id', verifyAuthToken, update);
    app.post('/products', verifyAuthToken, create);
    app.delete('/products/:id', verifyAuthToken, destroy);
}

export default productRoutes;