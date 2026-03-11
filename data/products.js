export let products = [];

export function loadProducts(fun) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    products = JSON.parse(xhr.response);
    fun();
  })

  xhr.open('GET', 'https://supersimplebackend.dev/products')
  xhr.send();
}
