import PropTypes from 'prop-types';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import './ProductPreviewPromotion.css';

class ProductPreviewPromotion extends Component {
  render() {
    const {
      product,
      product: {
        thumbnail,
        title,
        price,
        id,
        shipping,
      },
      clickBtnAddToCart,
    } = this.props;
    const originalPrice = product.original_price;
    const discountPercentage = Math.round((1 - price / originalPrice) * 100);
    return (
      <div className="product-promotion-div">
        <Link
          to={ `/product-details/${id}` }
        >
          <img src={ thumbnail } alt={ title } />
          {/* {shipping.free_shipping && <p>Frete Gratis</p>} */}
          <p className="name-product">{title}</p>
          <div className="price-div">
            <p>
              {`De: ${originalPrice
                .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}
            </p>
            <p>
              {`Por: ${price
                .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}
            </p>
            <p>{`${discountPercentage}% OFF`}</p>
          </div>
        </Link>
        <button
          onClick={ () => clickBtnAddToCart(product) }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

ProductPreviewPromotion.propTypes = {
  clickBtnAddToCart: PropTypes.func.isRequired,
  product: PropTypes.shape({
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    quantity: PropTypes.number,
    shipping: PropTypes.shape({
      free_shipping: PropTypes.bool.isRequired,
    }),
    original_price: PropTypes.number.isRequired,
  }),
};

ProductPreviewPromotion.defaultProps = {
  product: PropTypes.shape({
    quantity: 1,
  }),
};

export default ProductPreviewPromotion;
