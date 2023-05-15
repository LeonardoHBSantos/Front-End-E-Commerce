import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { clickBtnAddToCart, clickBtnSubmitAvaliation } from '../services/ClickFunctions';
import { getProductObj } from '../services/DidMountFunctions';
import { updateSizeCart } from '../services/UpdateSizeCartFuntion';
import { changeInputs } from '../services/ChangeFuntions';
import styles from './DetailsPage.module.css';
import convertImageUrl from '../services/convertImageUrl';
import Loading from '../components/Loading';

class DetailsPage extends Component {
  state = {
    productInfo: '',
    text: '',
    email: '',
    invalid: false,
    loading: true,
  };

  clickBtnAddToCart = clickBtnAddToCart.bind(this);

  getProductObj = getProductObj.bind(this);

  clickBtnSubmitAvaliation = clickBtnSubmitAvaliation.bind(this);

  changeIptsFormAvaliation = changeInputs.bind(this);

  componentDidMount() {
    this.getProductObj();
    updateSizeCart(this);
  }

  render() {
    const { match: { params: { id } } } = this.props;
    const ratings = JSON.parse(localStorage.getItem(id));
    const { productInfo, email, text, invalid, cartSize, loading,
      productInfo: { title,
        price,
        thumbnail,
        attributes,
        shipping } } = this.state;
    const content = () => {
      if (loading) {
        return <Loading />;
      }
      return (
        <main className={ styles.container }>
          <section className={ styles.image_and_date_product }>
            <img
              src={ convertImageUrl(thumbnail) }
              alt={ title }
              className={ styles.product_image }
            />
            <div className={ styles.product_info }>
              <h2 className={ styles.title }>{title}</h2>
              <h3 className={ styles.price }>
                {price
                  .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </h3>
              {shipping.free_shipping && (
                <p className={ styles.free_shipping }>Frete Grátis</p>)}
            </div>
          </section>
          <section className={ styles.specifications_product }>
            <p>Especificações:</p>
            <table>
              <tbody className={ styles.table_body }>
                {productInfo !== ''
            && attributes.map((att, index) => {
              if (att.value_name) {
                return (
                  <tr key={ index }>
                    <td className={ styles.specification_item }>{att.name}</td>
                    <td className={ styles.specification_value }>{att.value_name}</td>
                  </tr>
                );
              }
              return null;
            })}
              </tbody>
            </table>
          </section>
          <div className={ styles.buttons }>
            <button className={ styles.cart_button }>
              <Link to="/shoppingcart">Carrinho</Link>
            </button>
            <span className={ styles.cart_size }>{cartSize}</span>
            <button
              className={ styles.submit_button }
              onClick={ () => this.clickBtnAddToCart(productInfo) }
            >
              Adicionar ao carrinho
            </button>
          </div>
          <form className={ styles.rating_form }>
            <input
              type="email"
              name="email"
              className={ styles.email_input }
              onChange={ this.changeIptsFormAvaliation }
              value={ email }
            />
            <textarea
              required
              name="text"
              className={ styles.textarea_input }
              cols="10"
              rows="2"
              onChange={ this.changeIptsFormAvaliation }
              value={ text }
            />
            <label htmlFor="" className={ styles.rating_label }>
              <input
                type="radio"
                name="rating"
                value="1"
                className={ styles.rating_input }
                onChange={ this.changeIptsFormAvaliation }
              />
              1
              <input
                type="radio"
                name="rating"
                value="2"
                className={ styles.rating_input }
                onChange={ this.changeIptsFormAvaliation }
              />
              2
              <input
                type="radio"
                name="rating"
                value="3"
                className={ styles.rating_input }
                onChange={ this.changeIptsFormAvaliation }
              />
              3
              <input
                type="radio"
                name="rating"
                value="4"
                className={ styles.rating_input }
                onChange={ this.changeIptsFormAvaliation }
              />
              4
              <input
                type="radio"
                name="rating"
                value="5"
                className={ styles.rating_input }
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
        </main>
      );
    };
    return (
      content()
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
