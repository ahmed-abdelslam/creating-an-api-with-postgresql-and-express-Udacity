import Client from '../database';

export type Order = {
    id ?: number,
    status: string,
    user_id: number | string
}

export type OrderProducts = {
    id ?: number,
    quantity: number,
    order_id: number | string,
    product_id: number | string
}

export class OrderStore {

    async index(): Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);   
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Cannot get orders ${error}`);
        }
    }

    async show(id: string): Promise<Order | string> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            if (result.rows.length)
                return result.rows[0];
            return `Could not find order ${id}`;
        } catch (error) {
            throw new Error(`Could not find order {$id}. Error: ${error}`);
        }
    }

    async create(o: Order): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *';
            const result = await conn.query(sql, [o.status, o.user_id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not add new order. Error: ${error}`)
        }
    }

    async addProduct(quantity: number, orderId: string, productId: string): Promise<OrderProducts> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [quantity, orderId, productId]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not add product ${productId} to order ${orderId}. Error: ${error}`);
        }
    }

    async update(o: Order, id: string): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = 'UPDATE orders SET status=($1), user_id=($2) WHERE id=($3) RETURNING *';
            const result = await conn.query(sql, [o.status, o.user_id, id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not update order ${o.id}. Error: ${error}`)
        }
    }

    async getCurrentOrdersByUserId(userId: string) : Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = "SELECT * FROM orders WHERE user_id=($1) AND status='active'";
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Could not get orders of user ${userId}}. Error: ${error}`)
        }
    }

    async delete(id: string): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = 'DELETE FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not delete order ${id}. Error: ${error}`)
        }
    }

}