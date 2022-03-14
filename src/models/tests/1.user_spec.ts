import {User, UserStore} from '../user';
import { resetSequenceOfId } from '../../utils/reset_sequence_of_ids';

const store = new UserStore;


describe('User Model', () => {

    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have a update method', () => {
        expect(store.update).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });

    it('should have an authenticate method', () => {
        expect(store.authenticate).toBeDefined();
    });


    it('create method should add a user', async () => {
        const result = await store.create({
            username: 'ahmed_mohamed',
            firstname: 'Ahmed',
            lastname: 'Abdelslam',
            password: 'MyPass'
        });

        expect(result.username).toEqual('ahmed_mohamed');
        expect(result.firstname).toEqual('Ahmed');
        expect(result.lastname).toEqual('Abdelslam');
    });

    it('index method should return a list of users', async () => {
        const result = await store.index();
        
        expect(result[0].username).toEqual('ahmed_mohamed');
        expect(result[0].firstname).toEqual('Ahmed');
        expect(result[0].lastname).toEqual('Abdelslam');
    });

    it('show method should return the correct user', async () => {
        const result = await store.show("1");
        
        expect(result.username).toEqual('ahmed_mohamed');
        expect(result.firstname).toEqual('Ahmed');
        expect(result.lastname).toEqual('Abdelslam');
    });

    it('update method should return the updated user', async () => {
        const updatedUser: User = {
            username: 'ahmed97',
            firstname: 'Nest',
            lastname: 'Test',
            password: 'Updated'
        };
        const result = await store.update(updatedUser, "1");
        
        expect(result.username).toEqual('ahmed97');
        expect(result.firstname).toEqual('Nest');
        expect(result.lastname).toEqual('Test');
    });

    it('delete method should remove the user', async () => {
        await store.delete("1");
        const result = await store.index()

        expect(result).toEqual([]);
    });

    afterAll(async () => {
        await resetSequenceOfId('users');
    });
});