// If you want to test addToCart, go to cart.js
// Replace the quantity with  a dummy value of 1 instead of value from DOM

import { addToCart, loadToStorage ,cart } from "../data/cart.js";

describe('Test suite: addToCart', () => {
    it('updates quanitity of existing item', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliverId: 1
            }]);
        });
        spyOn(localStorage, 'setItem');
        loadToStorage();
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        console.log(cart)

        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
    });
    it('adds new item to cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        spyOn(localStorage, 'setItem');
        loadToStorage();
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        console.log(cart)

        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    })
})