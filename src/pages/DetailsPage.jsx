import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { clickBtnAddToCart } from '../services/ClickFunctions';
import { getProductObj } from '../services/DidMountFunctions';

class DetailsPage extends Component {
  state = {
    productInfo: '',
  };

  clickBtnAddToCart = clickBtnAddToCart.bind(this);

  getProductObj = getProductObj.bind(this);

  componentDidMount() {
    this.getProductObj();
  }

  render() {
    const { productInfo,
      productInfo: { title, price, thumbnail, attributes } } = this.state;
    return (
      <div>
        <h2>{title}</h2>
        <img src={ thumbnail } alt={ title } />
        <h3>{ price }</h3>
        <ul>
          Especificações:
          { productInfo !== '' && attributes
            .map((att, index) => (
              <li
                key={ index }
              >
                {`${att.name}: ${att.value_name}`}
              </li>)) }
        </ul>
        <button>
          <Link to="/shoppingcart">Carrinho</Link>
        </button>
        <button
          onClick={ () => this.clickBtnAddToCart(productInfo) }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

DetailsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
export default DetailsPage;
