import supertest from "supertest";
import app from "../../server";
import { resetSequenceOfId } from '../../utils/reset_sequence_of_ids';

const request = supertest(app);
let token: string;

describe("Test user endpoints responses", (): void => {
    it("creates a new user and response with 200 status and a token", async () => {
        const response = await request.post(
            "/users"
        )
        .send({
            username:"ahmed1997",
            firstname: "ahmed",
            lastname: "mohamed",
            password: "ahmed2022"
        });
        expect(response.status).toBe(200);
        token = 'Bearer '+response.body;
    });

    it("gets a list of all users and response with 200 status", async () => {
        
        const response = await request.get(
            "/users"
        )
        .set({Authorization: token})
        expect(response.status).toBe(200);
        expect(response.body[0].username).toEqual('ahmed1997');
        expect(response.body[0].firstname).toEqual('ahmed');
        expect(response.body[0].lastname).toEqual('mohamed');
    });

    it("gets a user with specific id and response with 200 status", async () => {
        const response = await request.get(
            "/users/1"
        )
        .set({Authorization: token})
        expect(response.status).toBe(200);
        expect(response.body.username).toEqual('ahmed1997');
        expect(response.body.firstname).toEqual('ahmed');
        expect(response.body.lastname).toEqual('mohamed');
    });

    it("updates a user with specific id and response with 200 status", async () => {
        const response = await request.put(
            "/users/1"
        )
        .set({Authorization: token})
        .send({
            username:"moo",
            firstname: "mo",
            lastname: "salah",
            password: "salah2022"
        });
        expect(response.status).toBe(200);
        
        expect(response.body.username).toEqual('moo');
        expect(response.body.firstname).toEqual('mo');
        expect(response.body.lastname).toEqual('salah');
    });

    it("authenticates and response with 200 status", async () => {
        const response = await request.post(
            "/users/login"
        )
        .send({
            username:"moo",
            password: "salah2022"
        });
        expect(response.status).toBe(200);
        token = 'Bearer '+response.body;
    });

    it("deletes a user with specific id and response with 200 status", async () => {
        const response = await request.delete(
            "/users/1"
        )
        .set({Authorization: token});
        expect(response.status).toBe(200);
    });

    afterAll(async () => {
        await resetSequenceOfId('users');
    });

});
