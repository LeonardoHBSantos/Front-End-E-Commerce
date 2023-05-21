export async function updateTotalCart(component) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalAccount = cart.reduce((acc, { price, quantity }) => {
    acc += price * quantity;
    return acc;
  }, 0);
  localStorage.setItem('totalAccount', totalAccount);
  component.setState({
    totalAccount,
  });
}
