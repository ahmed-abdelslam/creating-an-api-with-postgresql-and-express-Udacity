import {Product, ProductStore} from '../product';
import { resetSequenceOfId } from '../../utils/reset_sequence_of_ids';

const store = new ProductStore;


describe('Product Model', () => {
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


    it('create method should add a product', async () => {
        const result = await store.create({
            name: 'iPhone',
            price: 500
        });
        expect(result).toEqual({
            id: 1,
            name: 'iPhone',
            price: 500,
            category: null
        });
    });

    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result).toEqual([{
            id: 1,
            name: 'iPhone',
            price: 500,
            category: null
        }]);
    });

    it('show method should return the correct product', async () => {
        const result = await store.show("1");
        expect(result).toEqual({
            id: 1,
            name: 'iPhone',
            price: 500,
            category: null
        });
    });

    it('update method should update a product', async () => {
        const result = await store.update({
            name: 'iPhone 5s',
            price: 600,
            category: "Mobiles"
        }, "1");
        expect(result).toEqual({
            id: 1,
            name: 'iPhone 5s',
            price: 600,
            category: "Mobiles"
        });
    });

    it('delete method should remove the product', async () => {
        await store.delete("1");
        const result = await store.index();

        expect(result).toEqual([]);
    });

    afterAll(async () => {
        await resetSequenceOfId('products');
    });
});