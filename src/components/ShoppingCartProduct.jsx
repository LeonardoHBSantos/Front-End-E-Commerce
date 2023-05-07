import { Component } from 'react';
import PropTypes from 'prop-types';

class ShoppingCartProduct extends Component {
  render() {
    const { name,
      price,
      image,
      id,
      quantity,
      quantityTotal,
      clickBtnQuantity,
      clickBtnDelete,
    } = this.props;
    return (
      <div id={ id }>
        <button
          type="button"
          onClick={ clickBtnDelete }
        >
          Excluir
        </button>
        <img src={ image } alt={ name } />
        <span>{name}</span>
        <button
          name="decreaseButton"
          onClick={ clickBtnQuantity }
          disabled={ quantity === 1 }
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          name="increaseButton"
          onClick={ clickBtnQuantity }
          disabled={ (quantity === quantityTotal) }
        >
          +
        </button>
        <span>{(price * quantity).toFixed(2)}</span>
      </div>
    );
  }
}

ShoppingCartProduct.propTypes = {
  clickBtnDelete: PropTypes.func.isRequired,
  clickBtnQuantity: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  quantityTotal: PropTypes.number.isRequired,
};

export default ShoppingCartProduct;
