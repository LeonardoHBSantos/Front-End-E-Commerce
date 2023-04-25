import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { clickBtnAddToCart, clickBtnSubmitAvaliation } from '../services/ClickFunctions';
import { getProductObj } from '../services/DidMountFunctions';
import { updateSizeCart } from '../services/UpdateSizeCartFuntion';
import { changeIptsFormAvaliation } from '../services/ChangeFuntions';

class DetailsPage extends Component {
  state = {
    productInfo: '',
    text: '',
    email: '',
    invalid: false,
  };

  clickBtnAddToCart = clickBtnAddToCart.bind(this);

  getProductObj = getProductObj.bind(this);

  clickBtnSubmitAvaliation = clickBtnSubmitAvaliation.bind(this);

  changeIptsFormAvaliation = changeIptsFormAvaliation.bind(this);

  componentDidMount() {
    this.getProductObj();
    updateSizeCart(this);
  }

  render() {
    const { match: { params: { id } } } = this.props;
    const ratings = JSON.parse(localStorage.getItem(id));
    const { productInfo, email, text, invalid, cartSize,
      productInfo: { title, price, thumbnail, attributes, shipping } } = this.state;
    return (
      <div>
        <img src={ thumbnail } alt={ title } />
        <h2>{title}</h2>
        <h3>{ price }</h3>
        {shipping?.free_shipping && (
          <p
            data-testid="free-shipping"
          >
            Frete Gratis
          </p>
        )}
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
        <span>{cartSize}</span>
        <button
          onClick={ () => this.clickBtnAddToCart(productInfo) }
        >
          Adicionar ao carrinho
        </button>
        <form>
          <input
            type="email"
            name="email"
            onChange={ this.changeIptsFormAvaliation }
            value={ email }
          />
          <textarea
            required
            name="text"
            cols="10"
            rows="2"
            onChange={ this.changeIptsFormAvaliation }
            value={ text }
          />
          <label htmlFor="">
            <input
              type="radio"
              name="rating"
              value="1"
              onChange={ this.changeIptsFormAvaliation }
            />
            1
            <input
              type="radio"
              name="rating"
              value="2"
              onChange={ this.changeIptsFormAvaliation }
            />
            2
            <input
              type="radio"
              name="rating"
              value="3"
              onChange={ this.changeIptsFormAvaliation }
            />
            3
            <input
              type="radio"
              name="rating"
              value="4"
              onChange={ this.changeIptsFormAvaliation }
            />
            4
            <input
              type="radio"
              name="rating"
              value="5"
              onChange={ this.changeIptsFormAvaliation }
            />
            5
          </label>
          <button
            type="submit"
            onClick={ this.clickBtnSubmitAvaliation }
          >
            Enviar
          </button>
        </form>
        { invalid && <p>Campos inválidos</p> }

        { ratings ? ratings.map((el, index) => (
          <div key={ index }>

            <label htmlFor="">
              Email:
              <h3>{el.email}</h3>
            </label>
            <label htmlFor="">
              Comentário:
              <h3>{el.text}</h3>
            </label>
            <label htmlFor="">
              Avaliação:
              <h3>{el.rating}</h3>
            </label>
          </div>
        )) : null }
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
