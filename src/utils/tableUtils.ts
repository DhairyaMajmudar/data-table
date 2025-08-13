import type { Product } from '../types/Product';

/**
 * Filter products based on category and search query
 */
export function filterProducts(
  products: Product[],
  filterCategory: string,
  searchQuery: string,
): Product[] {
  let filteredProducts = [...products];

  if (filterCategory) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === filterCategory,
    );
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query),
    );
  }

  return filteredProducts;
}

/**
 * Extract unique categories from products
 */
export function extractUniqueCategories(products: Product[]): string[] {
  const uniqueProducts = products.map((product) => product.category);
  const productSet = new Set(uniqueProducts);

  return [...productSet];
}
