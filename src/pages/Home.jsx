import React from 'react';
import { Link } from 'react-router-dom';
import ClickFunctions from '../services/ClickFunctions';
import ChangeFuntions from '../services/ChangeFuntions';
import Categories from '../components/Categories';

class Home extends React.Component {
  state = {
    searchInput: '',
  };

  changeIptSearch = ChangeFuntions.changeIptSearch.bind(this);

  clickBtnSearch = ClickFunctions.clickBtnSearch.bind(this);

  render() {
    const { searchInput } = this.state;
    return (
      <section>
        <input
          data-testid="query-input"
          type="text"
          value={ searchInput }
          placeholder="O Que Você Deseja Hoje?"
          onChange={ this.changeIptSearch }
        />
        <button
          data-testid="query-button"
          name={ `q=${searchInput}` }
          type="button"
          onClick={ this.clickBtnSearch }
        >
          Pesquisar
        </button>
        <div>
          <Categories onClick={ this.clickBtnSearch } />
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          <button>
            <Link to="/shoppingcart" data-testid="shopping-cart-button">Carrinho</Link>
          </button>
        </div>
      </section>
    );
  }
}

export default Home;
