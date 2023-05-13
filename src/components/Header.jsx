import PropTypes from 'prop-types';
import { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { withRouter } from 'react-router-dom';
import styles from './Header.module.css';
import Logo from './Logo';
import { clickBtnSearch } from '../services/ClickFunctions';
import { changeInputs } from '../services/ChangeFuntions';

class Header extends Component {
  state = {
    searchInput: '',
  };

  changeIptSearch = changeInputs.bind(this);

  clickBtnSearch = clickBtnSearch.bind(this);

  render() {
    const { searchInput } = this.state;
    const { cartSize } = this.props;
    return (
      <header>
        <Link to="/">
          <Logo />
        </Link>
        <div className={ styles.search_div }>
          <input
            type="text"
            value={ searchInput }
            placeholder="O Que Você Deseja Hoje?"
            name="searchInput"
            onChange={ this.changeIptSearch }
          />
          <button
            type="button"
            onClick={ this.clickBtnSearch }
          >
            <i className="bi bi-search" />
          </button>
        </div>
        <Link to="shoppingcart">
          <div className={ styles.cart_icon_div }>
            <span>{cartSize}</span>
            <i className={ `${styles.cart_icon} bi bi-bag-fill` } />
          </div>
        </Link>
      </header>
    );
  }
}

Header.propTypes = {
  cartSize: PropTypes.number.isRequired,
};

export default withRouter(Header);
