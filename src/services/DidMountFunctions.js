import { getCategories, getDailyOferts, getProductById } from './RequestFunctions';

export async function getProductObj() {
  const { match: { params: { id } } } = this.props;
  const product = await getProductById(id);
  this.setState({
    productInfo: product,
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
