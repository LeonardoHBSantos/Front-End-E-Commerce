import PropTypes from 'prop-types';
import React from 'react';
import ProductPreview from '../components/ProductPreview';
import Categories from '../components/Categories';
import { clickBtnAddToCart, clickBtnCategory } from '../services/ClickFunctions';
import Loading from '../components/Loading';
import Header from '../components/Header';
import searchUpdate from '../services/DidUpdateFunctions';
import { updateSizeCart } from '../services/UpdateSizeCartFuntion';
import { updateDailyOferts } from '../services/DidMountFunctions';
import ProductPreviewPromotion from '../components/ProductPreviewPromotion';
import './Home.css';

class Home extends React.Component {
  state = {
    cartSize: 0,
    resultSearch: '',
    loading: true,
  };

  clickBtnCategory = clickBtnCategory.bind(this);

  clickBtnAddToCart = clickBtnAddToCart.bind(this);

  searchUpdate = searchUpdate.bind(this);

  updateDailyOferts = updateDailyOferts.bind(this);

  componentDidMount() {
    updateSizeCart(this);
    this.updateDailyOferts();
  }

  componentDidUpdate(prevProps) {
    this.searchUpdate(prevProps);
  }

  render() {
    const { resultSearch, loading, cartSize, dailyOferts } = this.state;
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
    } else if (dailyOferts && dailyOferts.length > 0) {
      const minNumberProducts = 35;
      content = dailyOferts
        .filter((obj, index, self) => {
          return index === self.findIndex((t) => (
            t.id === obj.id
          ));
        })
        .map((result, index) => index < minNumberProducts && (
          <ProductPreviewPromotion
            clickBtnAddToCart={ this.clickBtnAddToCart }
            product={ result }
            key={ result.id }
          />
        ));
    }

    return (
      <>
        <Header cartSize={ cartSize } />
        <main>
          <div className="categories-div">
            <Categories onClick={ this.clickBtnCategory } />
          </div>
          <div className="content-div">
            {content}
          </div>
        </main>
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
