export let cart = JSON.parse(localStorage.getItem('cart')) ||
  [{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryId: 1
  }, {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryId: 2
  }];

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

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
        quantity,
        deliveryId: 1
      });
    }
    
    saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  })
  cart = newCart;
  saveToStorage();
}

export function updateCart (id, newQuantity) {
  cart.forEach(cartItem => {
    if (cartItem.productId === id) {
      let {quantity} = cartItem;
      quantity = newQuantity;
      cartItem.quantity = quantity;
      saveToStorage();
    } 
  })
}

export function updateDeliveryOption(productId, deliveryId) {
  let matchingItem;
  cart.forEach(item => {
        if(item.productId === productId) {
          matchingItem = item;
        }
    });
  matchingItem.deliveryId = deliveryId;
  saveToStorage();
}