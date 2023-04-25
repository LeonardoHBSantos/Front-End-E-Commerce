import { getCategories, getProductById } from './RequestFunctions';

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
