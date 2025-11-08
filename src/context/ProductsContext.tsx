import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product, ProductsContextType } from "../types";
import { api } from "../utils/api";

// Create product context
const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

// Provides product and category data to the whole app
export const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch products (optionally filtered by category)
  const fetchProducts = async (categories?: string[]) => {
    setLoading(true);
    setError(null);
    try {
      if (!categories || categories.length === 0) {
        const data = await api.getProducts();
        setProducts(data);
      } else {
        const results = await Promise.all(
          categories.map((cat) => api.getProducts(cat))
        );
        setProducts(results.flat());
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const data = await api.getCategories();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch categories");
    }
  };

  // Load products and categories on mount
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Update products when selected categories change
  useEffect(() => {
    selectedCategories.length > 0
      ? fetchProducts(selectedCategories)
      : fetchProducts();
  }, [selectedCategories]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        categories,
        selectedCategories,
        setSelectedCategories,
        fetchProducts,
        fetchCategories,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

// Hook to access product data
export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) throw new Error("useProducts must be used within a ProductsProvider");
  return context;
};
