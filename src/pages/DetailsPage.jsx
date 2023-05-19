import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { clickBtnAddToCart } from '../services/ClickFunctions';
import { getProductObj } from '../services/DidMountFunctions';
import { updateSizeCart } from '../services/UpdateSizeCartFuntion';
import styles from './DetailsPage.module.css';
import convertImageUrl from '../services/convertImageUrl';
import Loading from '../components/Loading';
import Header from '../components/Header';
import RatingSection from '../components/RatingSection';

class DetailsPage extends Component {
  state = {
    productInfo: '',
    loading: true,
  };

  clickBtnAddToCart = clickBtnAddToCart.bind(this);

  getProductObj = getProductObj.bind(this);

  componentDidMount() {
    this.getProductObj();
    updateSizeCart(this);
  }

  render() {
    const { match: { params: { id } } } = this.props;
    const { productInfo, loading, cartSize,
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
        <>
          <Header cartSize={ cartSize } />
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
                <button
                  className={ styles.cart_button }
                  onClick={ () => this.clickBtnAddToCart(productInfo) }
                >
                  Adicionar ao carrinho
                </button>
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
            <RatingSection id={ id } />
          </main>
        </>
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
