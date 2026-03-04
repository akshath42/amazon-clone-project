import { products } from "../../data/products.js";
import {formatCurrency} from "./../utils/money.js";
import { cart, removeFromCart, updateCart as updateCartQuantity, updateDeliveryOption, getProduct, getDeliveryOption } from "../../data/cart.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderOrderSummary() {
    let cartSummaryHtml = '';

    cart.forEach((cartItem) => {
        const {productId, quantity, deliveryId} = cartItem;

        const product = getProduct(productId);  
        const {image, name, priceCents, id} = product;

        const matchingOption = getDeliveryOption(deliveryId);

        const today = dayjs();
        const deliveryDay = today.add(matchingOption.deliveryDays, 'days');
        const formattedDate = deliveryDay.format('dddd, MMMM D');

        cartSummaryHtml += `
        <div class="cart-item-container js-cart-item-container-${id}">
            <div class="delivery-date">
                Delivery date: ${formattedDate}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${name}
                </div>
                <div class="product-price">
                    $${formatCurrency(priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label js-quantity-label">${quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-productId=${id}>
                    Update
                    </span>
                    <input class="quantity-input">
                    <span class="save-quantity-link link-primary" data-productId=${id}>Save</span>
                    <span class="delete-quantity-link link-primary 
                        js-delete-link" data-productId=${id}>
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionHtml(id, cartItem)}
                </div>
            </div>
            </div>
        `;
    })


    function deliveryOptionHtml(id, cartItem) {
        let html = '';
        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs();
            const deliveryDay = today.add(deliveryOption.deliveryDays, 'days');
            const formattedDate = deliveryDay.format('dddd, MMMM D');
            const isChecked = deliveryOption.id === cartItem.deliveryId;
            html += `
                    <div class="delivery-option js-delivery-option"
                        data-product-id="${id}"
                        data-delivery-id="${deliveryOption.id}">
                        <input type="radio" ${isChecked ? 'checked': ''}
                        class="delivery-option-input"
                        name="delivery-option-${id}">
                        <div>
                        <div class="delivery-option-date">
                            ${formattedDate}
                        </div>
                        <div class="delivery-option-price">
                            ${
                                deliveryOption.priceCents === 0 ? 'Free':`$${formatCurrency(deliveryOption.priceCents)}`
                            } - Shipping
                        </div>
                        </div>
                    </div>
            `;
        })
        return html;
    }

    document.querySelector('.js-order-summary')
        .innerHTML = cartSummaryHtml;

    document.querySelectorAll('.js-delete-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productid;
                removeFromCart(productId);
                renderOrderSummary();
                renderPaymentSummary();
                renderCheckoutHeader();
            })
        })

    document.querySelectorAll('.js-update-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productid;
                const container = document.querySelector(`.js-cart-item-container-${productId}`);
                container.classList.add('is-editing-quantity')
            })
        });

    document.querySelectorAll('.save-quantity-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productid;
                const container = document.querySelector(`.js-cart-item-container-${productId}`);
                const inputElem = container.querySelector('.quantity-input')
                const updatedValue = Number(inputElem.value);
                updateCartQuantity(productId, updatedValue);
                renderOrderSummary();
                renderCheckoutHeader();
                renderPaymentSummary();
                container.classList.remove('is-editing-quantity');
            })
        });

    document.querySelectorAll('.js-delivery-option')
        .forEach(element => {
            element.addEventListener('click', ()=>{
                const {productId, deliveryId} = element.dataset;
                updateDeliveryOption(productId, Number(deliveryId));
                renderOrderSummary();
                renderPaymentSummary();
            })
        })

}
