import React from 'react';
import { Link } from 'react-router-dom';
import ProductPreview from '../components/ProductPreview';
import Categories from '../components/Categories';
import { changeInputs } from '../services/ChangeFuntions';
import { clickBtnSearch, clickBtnAddToCart } from '../services/ClickFunctions';
import { updateSizeCart } from '../services/UpdateSizeCartFuntion';
import Loading from '../components/Loading';

class Home extends React.Component {
  state = {
    searchInput: '',
    resultSearch: '',
    loading: false,
  };

  changeIptSearch = changeInputs.bind(this);

  clickBtnSearch = clickBtnSearch.bind(this);

  clickBtnAddToCart = clickBtnAddToCart.bind(this);

  componentDidMount() {
    updateSizeCart(this);
  }

  render() {
    const { searchInput, resultSearch, cartSize, loading } = this.state;
    return (
      <section>
        <input
          type="text"
          value={ searchInput }
          name="searchInput"
          placeholder="O Que Você Deseja Hoje?"
          onChange={ this.changeIptSearch }
        />
        <button
          value={ `q=${searchInput}` }
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
          {loading ? <Loading /> : (resultSearch !== '' && (
            resultSearch.length === 0
              ? (<p>Nenhum produto foi encontrado</p>)
              : (resultSearch.map((result) => (
                <ProductPreview
                  clickBtnAddToCart={ this.clickBtnAddToCart }
                  product={ result }
                  key={ result.id }
                />
              )))))}
        </div>
      </section>
    );
  }
}

export default Home;
