import PropTypes from 'prop-types';
import React from 'react';
import ProductPreview from '../components/ProductPreview';
import Categories from '../components/Categories';
import { clickBtnAddToCart, clickBtnCategory } from '../services/ClickFunctions';
import Loading from '../components/Loading';
import Header from '../components/Header';
import searchUpdate from '../services/DidUpdateFunctions';

class Home extends React.Component {
  state = {
    resultSearch: '',
    loading: false,
  };

  clickBtnCategory = clickBtnCategory.bind(this);

  clickBtnAddToCart = clickBtnAddToCart.bind(this);

  searchUpdate = searchUpdate.bind(this);

  componentDidUpdate(prevProps) {
    this.searchUpdate(prevProps);
  }

  render() {
    const { resultSearch, loading } = this.state;
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
        <Header />
        <section>
          <div>
            <Categories onClick={ this.clickBtnCategory } />
          </div>
          <div>
            {content}
          </div>
        </section>
      </>
    );
  }
}

Home.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

export default Home;
