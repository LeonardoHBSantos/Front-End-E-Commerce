import PropTypes from 'prop-types';
import { Component } from 'react';
import Header from '../components/Header';
import Categories from '../components/Categories';
import Loading from '../components/Loading';
import ProductPreview from '../components/ProductPreview';
import styles from './Search.module.css';
import { clickBtnAddToCart, clickBtnCategory } from '../services/ClickFunctions';
import { updateSizeCart } from '../services/UpdateSizeCartFuntion';
import { updateProducts } from '../services/DidMountFunctions';
import searchUpdate from '../services/DidUpdateFunctions';

class Search extends Component {
  state = {
    cartSize: 0,
    resultSearch: '',
    loading: true,
  };

  clickBtnCategory = clickBtnCategory.bind(this);

  clickBtnAddToCart = clickBtnAddToCart.bind(this);

  updateProducts = updateProducts.bind(this);

  searchUpdate = searchUpdate.bind(this);

  componentDidMount() {
    updateSizeCart(this);
    this.updateProducts();
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (prevProps.location !== location) {
      this.searchUpdate();
    }
  }

  render() {
    const { resultSearch, loading, cartSize } = this.state;
    let content;

    if (loading) {
      content = <Loading />;
    } else if (resultSearch && resultSearch.length > 0) {
      content = resultSearch.map((result) => (
        <ProductPreview
          clickBtnAddToCart={ this.clickBtnAddToCart }
          product={ result }
          key={ result.id }
        />
      ));
    } else if (resultSearch !== '') {
      content = <p>Nenhum produto foi encontrado</p>;
    }

    return (
      <>
        <Header cartSize={ cartSize } />
        <main className={ styles.main }>
          <div className={ styles.categories_div }>
            <Categories onClick={ this.clickBtnCategory } />
          </div>
          <div className={ styles.content_div }>
            {content}
          </div>
        </main>
      </>
    );
  }
}

Search.propTypes = {
  location: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};

export default Search;
