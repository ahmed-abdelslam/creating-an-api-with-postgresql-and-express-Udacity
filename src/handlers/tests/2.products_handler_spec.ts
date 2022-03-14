import supertest from "supertest";
import app from "../../server";
import { resetSequenceOfId } from '../../utils/reset_sequence_of_ids';

const request = supertest(app);
let token: string;

describe("Test product endpoints responses", (): void => {

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
    });

    it("creates a new product and response with 200 status", async () => {
        const response = await request.post(
            "/products"
        )
        .set({Authorization: token})
        .send({
            name:"Samsung",
            price: 400,
            category: "Mobiles"
        });
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            {
                id: 1,
                name:"Samsung",
                price: 400,
                category: "Mobiles"
            }
        );
    });

    it("gets a list of all products and response with 200 status", async () => {
        const response = await request.get(
            "/products"
        )
        
        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            {
                id: 1,
                name:"Samsung",
                price: 400,
                category: "Mobiles"
            }
        ]);
    });

    it("gets a product with specific id and response with 200 status", async () => {
        const response = await request.get(
            "/products/1"
        )
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            {
                id: 1,
                name:"Samsung",
                price: 400,
                category: "Mobiles"
            }
        );
    });

    it("updates a product with specific id and response with 200 status", async () => {
        const response = await request.put(
            "/products/1"
        )
        .set({Authorization: token})
        .send({
            name:"Samsung S3",
            price: 600,
            category: "Mobiles"
        });
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            {
                id: 1,
                name:"Samsung S3",
                price: 600,
                category: "Mobiles"
            }
        );
    });

    it("deletes a product with specific id and response with 200 status", async () => {
        const response = await request.delete(
            "/products/1"
        )
        .set({Authorization: token});
        expect(response.status).toBe(200);
    });

    afterAll(async () => {
        const response = await request.delete(
            "/users/1"
        )
        .set({Authorization: token});
        
        await resetSequenceOfId('products');
        await resetSequenceOfId('users');
    });
});
