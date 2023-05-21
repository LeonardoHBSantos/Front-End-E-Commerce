import { updateSizeCart } from './UpdateSizeCartFuntion';
import { updateTotalCart } from './UpdateTotalCartFunction';
import { alertInvalidInputs } from './alertFunctions';

export async function clickBtnSearch() {
  const { history } = this.props;
  const { searchInput } = this.state;
  history.push(`/search/query=${searchInput}`);
}

export async function clickBtnCategory({ target: { value } }) {
  const { history } = this.props;
  history.push(`/search/category=${value}`);
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
  const { name, id } = target;
  const { cart } = this.state;
  const productsCard = cart.map((product) => {
    if (product.id === id) {
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
  updateTotalCart(this);
  this.setState({
    cart: productsCard,
  });
}

export async function clickBtnDelete({ target }) {
  const arrayCart = JSON.parse(localStorage.getItem('cart'));
  const productId = target.id;
  const productsCard = arrayCart.filter(({ id }) => id !== productId);
  const productsCardString = JSON.stringify(productsCard);
  localStorage.setItem('cart', productsCardString);
  updateSizeCart(this);
  updateTotalCart(this);
  this.setState({
    cart: productsCard,
  });
}

export async function clickBtnSubmitAvaliation(id) {
  const { rating, text, email } = this.state;
  const validateEmailRegex = /^\S+@\S+\.\S+$/;
  const minCaracters = 15;
  if (!rating || !validateEmailRegex.test(email) || text.length <= minCaracters) {
    alertInvalidInputs();
  } else {
    const ratingArr = JSON.parse(localStorage.getItem(id)) || [];
    const idComment = ratingArr.length;
    const ratingObj = { email, text, rating, idComment };
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

export function clickRatingButtons(rating) {
  this.setState({
    rating: Number(rating),
  });
}

export function removeComment(idProduct, idComment) {
  const ratingArr = JSON.parse(localStorage.getItem(idProduct)) || [];
  const newRatingArr = ratingArr.filter((comment) => comment.idComment !== idComment);
  const ratingString = JSON.stringify(newRatingArr);
  localStorage.setItem(idProduct, ratingString);
  this.setState({
    text: '',
    email: '',
    rating: 0,
  });
}

export function clickCheckoutButton() {
  const { history } = this.props;
  const { cart } = this.state;
  history.push({
    pathname: '/checkout',
    state: { cart },
  });
}
