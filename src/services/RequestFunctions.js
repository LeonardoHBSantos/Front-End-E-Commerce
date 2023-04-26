export async function getCategories() {
  const endpoint = '/api/sites/MLB/categories';
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}

export async function getProductsFromQuery(query) {
  const endpoint = `/api/sites/MLB/search?q=${query}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}

export async function getProductsFromCategory(categoryId) {
  const endpoint = `/api/sites/MLB/search?category=${categoryId}`;
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
