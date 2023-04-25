import React from 'react';
import { Link } from 'react-router-dom';
import ProductPreview from '../components/ProductPreview';
import Categories from '../components/Categories';
import { changeIptSearch } from '../services/ChangeFuntions';
import { clickBtnSearch, clickBtnAddToCart } from '../services/ClickFunctions';

class Home extends React.Component {
  state = {
    searchInput: '',
    resultSearch: '',
  };

  changeIptSearch = changeIptSearch.bind(this);

  clickBtnSearch = clickBtnSearch.bind(this);

  clickBtnAddToCart = clickBtnAddToCart.bind(this);

  render() {
    const { searchInput, resultSearch, cartSize } = this.state;
    return (
      <section>
        <input
          type="text"
          value={ searchInput }
          placeholder="O Que Você Deseja Hoje?"
          onChange={ this.changeIptSearch }
        />
        <button
          name={ `q=${searchInput}` }
          type="button"
          onClick={ this.clickBtnSearch }
        >
          Pesquisar
        </button>
        <div>
          <Categories onClick={ this.clickBtnSearch } />
          <button>
            <Link to="/shoppingcart">Carrinho</Link>
          </button>
          <span>{cartSize}</span>
        </div>
        <div>
          {resultSearch !== '' && (
            resultSearch.length === 0
              ? (<p>Nenhum produto foi encontrado</p>)
              : (resultSearch.map((result) => (
                <ProductPreview
                  clickBtnAddToCart={ this.clickBtnAddToCart }
                  product={ result }
                  key={ result.id }
                />
              )))
          )}
        </div>
      </section>
    );
  }
}

export default Home;
