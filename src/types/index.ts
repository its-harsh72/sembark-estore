// Structure of a single product (same as data from Fake Store API)
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Represents one item in the shopping cart
export interface CartItem {
  product: Product;
  quantity: number;
}

// Defines the shape of data and functions in ProductsContext
export interface ProductsContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  categories: string[];
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  fetchProducts: (categories?: string[]) => void;
  fetchCategories: () => void;
}
