export const cart = []
export function addToCart(productId) {
    let matchingItem;
    const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

    cart.forEach(item => {
        if(item.productId === productId) {
          matchingItem = item;
        }
    })
    if(matchingItem) {
      matchingItem.quantity += quantity;
    }
    else {
      cart.push({
        productId,
        quantity
      });
    }
}