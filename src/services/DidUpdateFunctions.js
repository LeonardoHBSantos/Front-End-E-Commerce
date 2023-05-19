import { getProductsFromCategory, getProductsFromQuery } from './RequestFunctions';

async function searchUpdate() {
  let { match: { params: { search } } } = this.props;
  this.setState({
    loading: true,
  });
  let results;
  if (search.includes('category')) {
    search = search.replace('category=', '');
    results = await getProductsFromCategory(search);
  } else if (search.includes('query')) {
    search = search.replace('query=', '');
    results = await getProductsFromQuery(search);
  }
  this.setState({
    prevSearch: search,
    resultSearch: [...results],
    loading: false,
  });
}

export default searchUpdate;
