import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProductsFetch } from "../data/products.js";

/*
loadProducts(() => {
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
})
*/

/*
loadProductsFetch().then(() => {
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
});
*/

async function loadPage() {
    try {
        await loadProductsFetch();
    }
    catch (error) {
        console.log('Unexpected error')
    }

    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
}

loadPage();