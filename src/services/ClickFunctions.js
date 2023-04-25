import { getProductsFromCategoryAndQuery } from './RequestFunctions';

export async function clickBtnSearch({ target: { name } }) {
  this.setState({
    loading: true,
  });
  const { results } = await getProductsFromCategoryAndQuery(name);
  this.setState({
    resultSearch: [...results],
    loading: false,
  });
}

export function clickBtnAddToCart(product) {
  const arrayCart = JSON.parse(localStorage.getItem('cart')) || [];
  product.quantity = 1;
  arrayCart.push(product);
  const cartString = JSON.stringify(arrayCart);
  localStorage.setItem('cart', cartString);
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartSize = cart.reduce((acc, { quantity }) => {
    acc += quantity;
    return acc;
  }, 0);
  localStorage.setItem('cartSize', cartSize);
  this.setState({
    cartSize,
  });
}
