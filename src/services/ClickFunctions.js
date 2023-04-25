import { getProductsFromCategoryAndQuery } from './RequestFunctions';

const ClickFunctions = {
  clickBtnSearch: async function clickBtnSearch({ target: { name } }) {
    const { results } = await getProductsFromCategoryAndQuery(name);
    this.setState({
      resultSearch: [...results],
    });
  },
};

export default ClickFunctions;
