// Base API URL
const BASE_URL = "https://fakestoreapi.com";

// All API request functions are grouped inside this object
export const api = {
  // Get all products or products by category
  getProducts: async (category?: string) => {
    const url = category
      ? `${BASE_URL}/products/category/${category}`
      : `${BASE_URL}/products`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch products");
    return response.json();
  },

  // Get all product categories
  getCategories: async () => {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) throw new Error("Failed to fetch categories");
    return response.json();
  },

  // Get a single product by its ID
  getProduct: async (id: string) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error("Failed to fetch product");
    return response.json();
  },
};
