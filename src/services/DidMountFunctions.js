import { getCategories,
  getDailyOferts,
  getProductById,
  getProductsFromCategory,
  getProductsFromQuery } from './RequestFunctions';

export async function getProductObj() {
  const { match: { params: { id } } } = this.props;
  const product = await getProductById(id);
  this.setState({
    productInfo: product,
    loading: false,
  });
}

export async function updateCategories() {
  const categories = await getCategories();
  this.setState({
    categories,
    loading: false,
  });
}

export async function updateDailyOferts() {
  const dailyOferts = await getDailyOferts();
  this.setState({
    dailyOferts,
    loading: false,
  });
}

export async function updateProducts() {
  let { match: { params: { search } } } = this.props;
  let results;
  if (search.includes('category')) {
    search = search.replace('category=', '');
    results = await getProductsFromCategory(search);
  } else if (search.includes('query')) {
    search = search.replace('query=', '');
    results = await getProductsFromQuery(search);
  }
  this.setState({
    resultSearch: [...results],
    loading: false,
  });
}
