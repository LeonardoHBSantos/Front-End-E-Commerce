export async function getCategories() {
  const endpoint = '/api/sites/MLB/categories';
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(input) {
  const endpoint = `/api/sites/MLB/search?q=${input}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}

export async function getProductById(id) {
  const endpoint = `/api/items/${id}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}
