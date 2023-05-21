import { Component } from 'react';
import ShoppingCartProduct from '../components/ShoppingCartProduct';
import { clickBtnQuantity,
  clickBtnDelete, clickCheckoutButton } from '../services/ClickFunctions';
import styles from './ShoppingCart.module.css';
import { updateTotalCart } from '../services/UpdateTotalCartFunction';

class ShoppingCart extends Component {
  productCart = JSON.parse(localStorage.getItem('cart')) || [];

  totalAccount = JSON.parse(localStorage.getItem('totalAccount') || 0.00);

  cartSize = JSON.parse(localStorage.getItem('cartSize') || 0);

  state = {
    cart: [...this.productCart],
    totalAccount: this.totalAccount,
    cartSize: this.cartSize,
  };

  clickBtnQuantity = clickBtnQuantity.bind(this);

  clickBtnDelete = clickBtnDelete.bind(this);

  clickCheckoutButton = clickCheckoutButton.bind(this);

  componentDidMount() {
    updateTotalCart(this);
  }

  render() {
    const { cart, totalAccount, cartSize } = this.state;
    return (
      <main>
        <h1 className={ styles.title }>Carrinho de Compras</h1>
        {cart.length > 0 ? (
          <>
            <div className={ styles.shopping_cart }>
              {
                cart.map((product) => {
                  const { price, title, thumbnail, id, quantity } = product;
                  return (
                    <ShoppingCartProduct
                      key={ id }
                      id={ id }
                      name={ title }
                      price={ price }
                      image={ thumbnail }
                      quantity={ quantity }
                      clickBtnQuantity={ this.clickBtnQuantity }
                      clickBtnDelete={ this.clickBtnDelete }
                      quantityTotal={ product.available_quantity }
                    />
                  );
                })
              }
            </div>
            <div className={ styles.total_and_finnaly }>
              <div className={ styles.total }>
                <h2>
                  Resumo da sua Compra:
                </h2>
                <div className={ styles.texts }>
                  <span>
                    Nº de Produtos:
                  </span>
                  <span>
                    {cartSize}
                  </span>
                </div>
                <div className={ styles.texts }>
                  <span>
                    Total dessa Compra:
                  </span>
                  <span>
                    {totalAccount
                      .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
              </div>
              <button
                className={ styles.checkout_button }
                onClick={ this.clickCheckoutButton }
              >
                Finalizar compra
              </button>
            </div>
          </>
        )
          : (
            <p
              className={ styles.message_empty }
            >
              Seu carrinho está vazio,
              <br />
              adicione algum(s) produto(s) no carrinho para visualizá-lo(s) aqui!
            </p>
          )}
      </main>
    );
  }
}

export default ShoppingCart;
