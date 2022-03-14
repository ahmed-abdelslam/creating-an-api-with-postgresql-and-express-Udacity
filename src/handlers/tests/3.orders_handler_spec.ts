import supertest from "supertest";
import app from "../../server";
import { resetSequenceOfId } from '../../utils/reset_sequence_of_ids';

const request = supertest(app);
let token: string;

describe("Test order endpoints responses", (): void => {

    beforeAll(async () => {
        const response = await request.post(
            "/users"
        )
        .send({
            username:"ahmed1997",
            firstname: "ahmed",
            lastname: "mohamed",
            password: "ahmed2022"
        });

        token = 'Bearer '+response.body; 

        await request.post(
            "/products"
        )
        .set({Authorization: token})
        .send({
            name:"Samsung",
            price: 400,
            category: "Mobiles"
        });
    });


    it("creates a new order and response with 200 status", async () => {
        const response = await request.post(
            "/orders"
        )
        .set({Authorization: token})
        .send({
            status: 'complete',
            user_id: 1
        });
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            {
                id: 1,
                status: 'complete',
                user_id: '1'
            }
        );
    });

    it("gets a list of all orders and response with 200 status", async () => {
        const response = await request.get(
            "/orders"
        )
        .set({Authorization: token})
        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            {
                id: 1,
                status: 'complete',
                user_id: '1'
            }
        ]);
    });

    it("gets a order with specific id and response with 200 status", async () => {
        const response = await request.get(
            "/orders/1"
        )
        .set({Authorization: token})
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            {
                id: 1,
                status: 'complete',
                user_id: '1'
            }
        );
    });

    it("updates a order with specific id and response with 200 status", async () => {
        const response = await request.put(
            "/orders/1"
        )
        .set({Authorization: token})
        .send({
            status: 'active',
            user_id: 1
        });
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            {
                id: 1,
                status: 'active',
                user_id: '1'
            }
        );
    });

    it("adds product to an order", async () => {
        const response = await request.post(
            "/order/1/products"
        )
        .set({Authorization: token})
        .send({
            productId: '1',
            quantity: 20
        });
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            {
                id: 1,
                quantity: 20,
                order_id: '1',
                product_id: '1'
            }
        );
    });

    it("gets orders for a specific user", async () => {
        const response = await request.get(
            "/orders/user/1"
        )
        .set({Authorization: token})
        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            {
                id: 1,
                status: 'active',
                user_id: '1'
            }
        ]);
    });

    it("deletes a order with specific id and response with 200 status", async () => {
        const response = await request.delete(
            "/orders/1"
        )
        .set({Authorization: token});
        expect(response.status).toBe(200);
    });

    afterAll(async () => {
        await request.delete(
            "/users/1"
        )
        .set({Authorization: token});

        await request.delete(
            "/products/1"
        )
        .set({Authorization: token});
        
        await resetSequenceOfId('users');
        await resetSequenceOfId('products');
        await resetSequenceOfId('orders');
        await resetSequenceOfId('order_products');
    });

});
