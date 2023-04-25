import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { updateCategories } from '../services/DidMountFunctions';

class Categories extends React.Component {
  state = {
    categories: [],
    loading: true,
  };

  updateCategories = updateCategories.bind(this);

  componentDidMount() {
    this.updateCategories();
  }

  render() {
    const { categories, loading } = this.state;
    const { onClick } = this.props;
    return (
      <section>
        {loading ? <Loading /> : (
          categories.map(({ id, name }) => (
            <button
              value={ `category=${id}` }
              key={ id }
              onClick={ onClick }
            >
              {name}
            </button>))
        )}
      </section>
    );
  }
}

Categories.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Categories;
