// Select all products
export const selectProducts = (state) => state.product.products;

// Select single product
export const selectProduct = (state) => state.product.product;

// Select loading state
export const selectProductLoading = (state) => state.product.loading;

// Select error state
export const selectProductError = (state) => state.product.error;

// Select search results
export const selectSearchResults = (state) => state.product.searchResults;

// Select filters
export const selectFilters = (state) => state.product.filters;

// Select sort by
export const selectSortBy = (state) => state.product.sortBy;

// Select pagination
export const selectPagination = (state) => state.product.pagination;

// Select filtered products
export const selectFilteredProducts = (state) => {
  const { products, filters } = state.product;
  let filteredProducts = [...products];

  // Apply category filter
  if (filters.category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === filters.category
    );
  }

  // Apply price range filter
  if (filters.priceRange) {
    const [min, max] = filters.priceRange;
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= min && product.price <= max
    );
  }

  // Apply rating filter
  if (filters.rating) {
    filteredProducts = filteredProducts.filter(
      (product) => product.rating >= filters.rating
    );
  }

  return filteredProducts;
};

// Select sorted products
export const selectSortedProducts = (state) => {
  const { products, sortBy } = state.product;
  let sortedProducts = [...products];

  switch (sortBy) {
    case "price-asc":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case "rating-desc":
      sortedProducts.sort((a, b) => b.rating - a.rating);
      break;
    case "name-asc":
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      break;
  }

  return sortedProducts;
};

// Select paginated products
export const selectPaginatedProducts = (state) => {
  const { products, pagination } = state.product;
  const { currentPage } = pagination;
  const itemsPerPage = 12; // You can adjust this value

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return products.slice(startIndex, endIndex);
};

// Select product by ID
export const selectProductById = (state, id) =>
  state.product.products.find((product) => product._id === id);

// Select products by category
export const selectProductsByCategory = (state, category) =>
  state.product.products.filter((product) => product.category === category);

// Select products by price range
export const selectProductsByPriceRange = (state, min, max) =>
  state.product.products.filter(
    (product) => product.price >= min && product.price <= max
  );

// Select products by rating
export const selectProductsByRating = (state, rating) =>
  state.product.products.filter((product) => product.rating >= rating);
