import React from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/RequestFunctions';
import Loading from './Loading';

class Categories extends React.Component {
  state = {
    categories: [],
    loading: true,
  };

  componentDidMount() {
    this.populateCategories();
  }

  populateCategories = async () => {
    const categories = await getCategories();
    this.setState({
      categories,
      loading: false,
    });
  };

  render() {
    const { categories, loading } = this.state;
    const { onClick } = this.props;
    return (
      <section>
        {loading ? <Loading /> : (
          categories.map(({ id, name }) => (
            <button
              name={ `category=${id}` }
              key={ id }
              data-testid="category"
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
