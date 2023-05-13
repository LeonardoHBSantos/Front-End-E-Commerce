import { getProductsFromCategory } from './RequestFunctions';
import { updateSizeCart } from './UpdateSizeCartFuntion';

export async function clickBtnSearch() {
  const { history } = this.props;
  const { searchInput } = this.state;
  history.push(`/?searchInput=${searchInput}`);
}

export async function clickBtnCategory({ target: { value } }) {
  this.setState({
    loading: true,
  });
  const results = await getProductsFromCategory(value);
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
  updateSizeCart(this);
}

export async function clickBtnQuantity({ target }) {
  const productId = target.parentNode.id;
  const { name } = target;
  const { cart } = this.state;
  const productsCard = cart.map((product) => {
    if (product.id === productId) {
      if (name === 'increaseButton') {
        product.quantity += 1;
      } else {
        product.quantity -= 1;
      }
    }
    return product;
  });
  const productsCardString = JSON.stringify(productsCard);
  localStorage.setItem('cart', productsCardString);
  updateSizeCart(this);
  this.setState({
    cart: productsCard,
  });
}

export async function clickBtnDelete({ target }) {
  const arrayCart = JSON.parse(localStorage.getItem('cart'));
  const productId = target.parentNode.id;
  const productsCard = arrayCart.filter(({ id }) => id !== productId);
  const productsCardString = JSON.stringify(productsCard);
  localStorage.setItem('cart', productsCardString);
  updateSizeCart(this);
  this.setState({
    cart: productsCard,
  });
}

export async function clickBtnSubmitAvaliation(event) {
  const { rating, text, email } = this.state;
  event.preventDefault();
  const validateEmailRegex = /^\S+@\S+\.\S+$/;
  if (!rating || validateEmailRegex.test(email) === false) {
    this.setState({
      invalid: true,
    });
  } else if (rating && validateEmailRegex.test(email) === true) {
    const { match: { params: { id } } } = this.props;
    const ratingObj = { email, text, rating };
    const ratingArr = JSON.parse(localStorage.getItem(id)) || [];
    ratingArr.push(ratingObj);
    const ratingString = JSON.stringify(ratingArr);
    localStorage.setItem(id, ratingString);
    this.setState({ text: '', email: '', rating: '' });
    this.setState({ invalid: false });
  }
}

export function clickBtnSubmitCheckout(event) {
  event.preventDefault();
  const { name,
    cpf,
    email, customerPhone, customerCep, customerAddress, paymentMethod } = this.state;
  if (!name
    || !cpf
    || !email || !customerPhone || !customerCep || !customerAddress || !paymentMethod) {
    this.setState({ error: true });
  } else {
    this.history.push('/');
  }
}
