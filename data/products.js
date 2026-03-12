export let products = [];

export function loadProductsFetch() {
  const promise = fetch('https://supersimplebackend.dev/products')
  .then((response)=> {
    return response.json();

  }).then((responseData) => {
    products = responseData;
  });
  return promise;
}
