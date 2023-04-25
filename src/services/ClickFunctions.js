import { getProductsFromCategoryAndQuery } from './RequestFunctions';

const ClickFunctions = {
  clickBtnSearch: async function clickBtnSearch({ target: { name } }) {
    this.setState({
      loading: true,
    });
    const { results } = await getProductsFromCategoryAndQuery(name);
    this.setState({
      resultSearch: [...results],
      loading: false,
    });
  },
};

export default ClickFunctions;
