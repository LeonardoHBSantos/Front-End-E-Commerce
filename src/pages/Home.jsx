import PropTypes from 'prop-types';
import React from 'react';
import Categories from '../components/Categories';
import { clickBtnAddToCart, clickBtnCategory } from '../services/ClickFunctions';
import Loading from '../components/Loading';
import Header from '../components/Header';
import { updateSizeCart } from '../services/UpdateSizeCartFuntion';
import { updateDailyOferts } from '../services/DidMountFunctions';
import styles from './Home.module.css';
import ProductPreviewPromotion from '../components/ProductPreviewPromotion';

class Home extends React.Component {
  state = {
    cartSize: 0,
    loading: true,
  };

  clickBtnCategory = clickBtnCategory.bind(this);

  clickBtnAddToCart = clickBtnAddToCart.bind(this);

  updateDailyOferts = updateDailyOferts.bind(this);

  componentDidMount() {
    updateSizeCart(this);
    this.updateDailyOferts();
  }

  render() {
    const { loading, cartSize, dailyOferts } = this.state;
    let content;

    if (loading) {
      content = <Loading />;
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

Home.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

export default Home;
