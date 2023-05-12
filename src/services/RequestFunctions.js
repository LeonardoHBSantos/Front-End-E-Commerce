export async function getCategories() {
  const endpoint = '/api/sites/MLB/categories';
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}

export async function getDailyOferts(categoryId) {
  try {
    const convertImageUrl = (url) => {
      const modifiedUrl = url.replace(/-I(\.[^.]+)$/, '-W$1');
      return modifiedUrl;
    };

    const fetch1 = await fetch(`/api/sites/MLB/search?category=${
      categoryId || 'MLB1648'
    }&sort=discount&deal_ids=MLB5899&offset=0&limit=50`);
    const fetch2 = await fetch(`/api/sites/MLB/search?category=${
      categoryId || 'MLB1648'
    }&sort=discount&deal_ids=MLB5899&offset=51&limit=50`);
    const fetch3 = await fetch(`/api/sites/MLB/search?category=${
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
    console.log(finalResult.length);
    return finalResult;
  } catch (error) {
    console.log(error.message);
  }
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
