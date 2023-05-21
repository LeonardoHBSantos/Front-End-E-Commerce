import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ShoppingCartProduct.module.css';

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
      <div className={ styles.product_div }>
        <img className={ styles.image } src={ image } alt={ name } />
        <div className={ styles.product }>
          <span className={ styles.name }>{name}</span>
          <div className={ styles.price_quantity_and_delete }>
            <div className={ styles.quantity }>
              <button
                name="decreaseButton"
                id={ id }
                className={ styles.quantity_button }
                onClick={ clickBtnQuantity }
                disabled={ quantity === 1 }
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                name="increaseButton"
                id={ id }
                className={ styles.quantity_button }
                onClick={ clickBtnQuantity }
                disabled={ (quantity === quantityTotal) }
              >
                +
              </button>
            </div>
            <span>
              {(price * quantity)
                .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}

            </span>
            <button
              type="button"
              id={ id }
              aria-label="delete"
              className={ `bi bi-trash3-fill ${styles.delete_button}` }
              onClick={ clickBtnDelete }
            />
          </div>
        </div>
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
