import PropTypes from 'prop-types';
import { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductPreview extends Component {
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
    return (
      <div>
        <Link
          to={ `/product-details/${id}` }
        >
          <img src={ thumbnail } alt={ title } />
          {shipping.free_shipping && <p>Frete Gratis</p>}
          <p>{title}</p>
          <p>{price}</p>
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

ProductPreview.propTypes = {
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
  }),
};

ProductPreview.defaultProps = {
  product: PropTypes.shape({
    quantity: 1,
  }),
};

export default ProductPreview;
