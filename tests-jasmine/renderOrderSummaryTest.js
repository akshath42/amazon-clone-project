import { renderOrderSummary } from "../scripts/checkout/orderSummary.js";
import { cart, loadToStorage } from "../data/cart.js";

describe('Test suite: renderOrderSummary', () => {
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

    beforeEach(() => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId1,
                quantity: 2,
                deliveryId: 1
            }, {
                productId: productId2,
                quantity: 1,
                deliveryId: 2
            }]);
        });
        spyOn(localStorage, 'setItem');
        loadToStorage();
        document.querySelector('.js-test-container')
            .innerHTML = `
                <div class="js-order-summary"></div>
                <div class="js-payment-summary"></div>
                <div class="js-checkout-header"></div>
            `;
        renderOrderSummary();
    })

    it('displays the page', () => {
        expect(document.querySelectorAll('.js-cart-item-container').length)
            .toEqual(2);
        expect(Number(document.querySelector(`.js-quantity-label-${productId1}`).innerHTML))
            .toEqual(cart[0].quantity);
        expect(Number(document.querySelector(`.js-quantity-label-${productId2}`).innerHTML))
            .toEqual(cart[1].quantity);
    });

    it('removes a product', () => {
        
        document.querySelector(`.js-delete-link-${productId1}`).click()
        expect(cart[0].productId).toEqual(productId2);
        expect(cart.length).toEqual(1)
    })
})