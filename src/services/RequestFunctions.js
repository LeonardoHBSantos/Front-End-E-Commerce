import convertImageUrl from './convertImageUrl';

export async function getCategories() {
  const endpoint = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}

export async function getDailyOferts(categoryId) {
  try {
    const fetch1 = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${
      categoryId || 'MLB1648'
    }&sort=discount&deal_ids=MLB5899&offset=0&limit=50`);
    const fetch2 = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${
      categoryId || 'MLB1648'
    }&sort=discount&deal_ids=MLB5899&offset=51&limit=50`);
    const fetch3 = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${
      categoryId || 'MLB1648'
    }&sort=discount&deal_ids=MLB5899&offset=101&limit=50`);
    const req1 = await fetch1.json();
    const req2 = await fetch2.json();
    const req3 = await fetch3.json();
    const results = [...req1.results, ...req2.results, ...req3.results];
    const filtered = results.filter((product) => product.original_price && product);
    const finalResult = filtered.map((product) => {
      product.thumbnail = convertImageUrl(product.thumbnail);
      return product;
    });
    return finalResult;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getProductsFromQuery(query) {
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const response = await fetch(endpoint);
  const { results } = await response.json();
  const finalResult = results.map((product) => {
    product.thumbnail = convertImageUrl(product.thumbnail);
    return product;
  });
  return finalResult;
}

export async function getProductsFromCategory(categoryId) {
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const response = await fetch(endpoint);
  const { results } = await response.json();
  const finalResult = results.map((product) => {
    product.thumbnail = convertImageUrl(product.thumbnail);
    return product;
  });
  return finalResult;
}

export async function getProductById(id) {
  const endpoint = `https://api.mercadolibre.com/items/${id}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}
