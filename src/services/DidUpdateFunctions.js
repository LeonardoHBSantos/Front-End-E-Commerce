import { getProductsFromQuery } from './RequestFunctions';

function searchUpdate(prevProps) {
  const { location: { search } } = this.props;
  const currentSearchInput = new URLSearchParams(search)
    .get('searchInput');
  const prevSearchInput = new URLSearchParams(prevProps.location.search)
    .get('searchInput');
  if (currentSearchInput !== prevSearchInput) {
    this.setState({ loading: true }, async () => {
      const { results } = await getProductsFromQuery(currentSearchInput);
      this.setState({
        resultSearch: results,
        loading: false,
      });
    });
  }
}

export default searchUpdate;
