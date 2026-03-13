import { cart, getDeliveryOption, getProduct } from "../../data/cart.js";
import { formatCurrency } from "../utils/money.js";
import { cartQuantity } from "../../data/cart.js";
import { addOrder } from "../../data/order.js";

export function renderPaymentSummary () {
    //Cost In cents
    let costOfItems = 0;
    //Shipping total in cents
    let shippingTotal = 0;

    cart.forEach((cartItem) => {
        const {quantity, productId, deliveryId} = cartItem;
        const product = getProduct(productId);
        costOfItems += quantity * product.priceCents;

        const deliveryOption = getDeliveryOption(deliveryId);
        shippingTotal += deliveryOption.priceCents;
    });
    
    const totalBeforeTax = costOfItems + shippingTotal;
    const taxCents = totalBeforeTax * 0.1;

    const orderTotal = totalBeforeTax + taxCents;

    const paymentHtml = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartQuantity()}):</div>
            <div class="payment-summary-money">$${formatCurrency(costOfItems)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingTotal)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(orderTotal)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order-button">
            Place your order
          </button>
        `;
    document.querySelector('.js-payment-summary')
        .innerHTML = paymentHtml;

    document.querySelector('.js-place-order-button')
      .addEventListener('click', async () => {
        try {
            const response = await fetch('https://supersimplebackend.dev/orders',  {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              cart
            })
          });
          const order = await response.json();
          addOrder(order);
        }
        catch (error) {
          console.log('Unexpected error')
        }
        window.location.href = 'orders.html'
      })
}