import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartProduct from '../components/ShoppingCartProduct';
import { clickBtnQuantity, clickBtnDelete } from '../services/ClickFunctions';

class ShoppingCart extends Component {
  productCart = JSON.parse(localStorage.getItem('cart')) || [];

  state = {
    cart: [...this.productCart],
  };

  clickBtnQuantity = clickBtnQuantity.bind(this);

  clickBtnDelete = clickBtnDelete.bind(this);

  render() {
    const { cart } = this.state;
    return (
      <section>
        {cart.length > 0 ? cart.map((product) => {
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
          : <p>Seu carrinho está vazio</p>}
        <button>
          <Link
            to={ {
              pathname: '/checkout',
              state: { cart },
            } }
          >
            Finalizar compra
          </Link>
        </button>
      </section>
    );
  }
}

export default ShoppingCart;
