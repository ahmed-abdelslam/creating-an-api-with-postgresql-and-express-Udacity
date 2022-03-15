import express, {Request, Response} from 'express';
import {User, UserStore} from '../models/user';
import jwt from 'jsonwebtoken';
import { verifyAuthToken } from '../middlewares/verifyAuthToken';

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
    try {
        const users = await store.index();
        res.json(users);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const user = await store.show(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        }

        const newUser = await store.create(user);
        const token = jwt.sign({user: newUser}, process.env.TOKEN_SECRET as string);
        res.json(token);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const user: User = {
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        }

        const updatedUser = await store.update(user, req.params.id);
        res.json(updatedUser);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const destroy = async (req: Request, res: Response) => {
    try {
        const deletedUser = await store.delete(req.params.id);
        res.json(deletedUser);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const authenticate = async (req: Request, res: Response) => {
    const user: User = {
        username: req.body.username,
        password: req.body.password,
    }
    try {
        const u = await store.authenticate(user.username, user.password)
        var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as string);
        res.json(token)
    } catch(error) {
        res.status(401)
        res.json({ error })
    }
}

const userRoutes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index);
    app.get('/users/:id', verifyAuthToken, show);
    app.post('/users', create);
    app.put('/users/:id', verifyAuthToken, update);
    app.delete('/users/:id', verifyAuthToken, destroy);
    app.post('/users/login', authenticate);
}

export default userRoutes;