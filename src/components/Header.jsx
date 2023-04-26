import { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './Header.css';
import { withRouter } from 'react-router-dom';
import Logo from './Logo';
import { clickBtnSearch } from '../services/ClickFunctions';
import { changeInputs } from '../services/ChangeFuntions';
import { updateSizeCart } from '../services/UpdateSizeCartFuntion';

class Header extends Component {
  state = {
    searchInput: '',
  };

  changeIptSearch = changeInputs.bind(this);

  clickBtnSearch = clickBtnSearch.bind(this);

  componentDidMount() {
    updateSizeCart(this);
  }

  render() {
    const { searchInput, cartSize } = this.state;
    return (
      <header>
        <Link to="/">
          <Logo />
        </Link>
        <div className="search-div">
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
          <div className="cart-icon-div">
            <span>{cartSize}</span>
            <i className="cart-icon bi bi-bag-fill" />
          </div>
        </Link>
      </header>
    );
  }
}

export default withRouter(Header);
