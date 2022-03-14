import {Order, OrderProducts, OrderStore} from '../order';
import {User, UserStore} from '../user';
import {Product, ProductStore} from '../product';
import { resetSequenceOfId } from '../../utils/reset_sequence_of_ids';

const store = new OrderStore;
const userStore = new UserStore;
const productStore = new ProductStore;


describe('Order Model', () => {

    beforeAll(async () => {
        const user = await userStore.create({
            username: 'ahmed_mohamed',
            firstname: 'Ahmed',
            lastname: 'Abdelslam',
            password: 'MyPass'
        });

        const product = await productStore.create({
            name: 'iPhone',
            price: 500
        });
    });

    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have an addProduct method', () => {
        expect(store.addProduct).toBeDefined();
    });

    it('should have a update method', () => {
        expect(store.update).toBeDefined();
    });

    it('should have an getCurrentOrdersByUserId method', () => {
        expect(store.getCurrentOrdersByUserId).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });


    it('create method should add a Order', async () => {
        const result = await store.create({
            status: 'active',
            user_id: 1
        });
        expect(result).toEqual({
            id: 1,
            status: 'active',
            user_id: '1'
        });
    });

    it('index method should return a list of Orders', async () => {
        const result = await store.index();
        expect(result).toEqual([{
            id: 1,
            status: 'active',
            user_id: '1'
        }]);
    });

    it('getCurrentOrdersByUserId method should return a list of active orders for specific user', async () => {
        const result = await store.getCurrentOrdersByUserId("1");
        expect(result).toEqual([{
            id: 1,
            status: 'active',
            user_id: '1'
        }]);
    });

    it('show method should return the correct Order', async () => {
        const result = await store.show("1");
        expect(result).toEqual({
            id: 1,
            status: 'active',
            user_id: '1'
        });
    });

    it('update method should update an order', async () => {
        const result = await store.update({
            status: 'completed',
            user_id: 1
        }, '1');
        expect(result).toEqual({
            id: 1,
            status: 'completed',
            user_id: '1'
        });
    });

    it('addProduct method should return a list of active orders for specific user', async () => {
        const result = await store.addProduct(50, "1", "1");
        expect(result).toEqual({
            id: 1,
            quantity: 50,
            order_id: '1',
            product_id: '1'
        });
    });

    it('delete method should remove the Order', async () => {
        await store.delete("1");
        const result = await store.index()

        expect(result).toEqual([]);
    });

    afterAll(async () => {
        await userStore.delete("1");
        await productStore.delete("1");

        await resetSequenceOfId('orders');
    });
});