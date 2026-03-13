export let products = [];

export function loadProductsFetch() {
  const promise = fetch('https://supersimplebackend.dev/products')
  .then((response)=> {
    return response.json();

  }).then((responseData) => {
    products = responseData;

  }).catch((error) => {
    console.log('Unexpected error')
  });
  return promise;
}
