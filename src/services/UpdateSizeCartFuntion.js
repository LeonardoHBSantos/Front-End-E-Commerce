export async function updateSizeCart(component) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartSize = cart.reduce((acc, { quantity }) => {
    acc += quantity;
    return acc;
  }, 0);
  localStorage.setItem('cartSize', cartSize);
  component.setState({
    cartSize,
  });
}
