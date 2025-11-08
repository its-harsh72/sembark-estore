import { makeAutoObservable } from "mobx";

// Structure of a product item
export interface Product {
  id: number;
  title: string;
  price: number;
  description?: string;
  image?: string;
  quantity?: number;
}

// MobX store for managing cart data
export default class CartStore {
  items: Product[] = [];

  constructor() {
    // Make properties reactive
    makeAutoObservable(this);

    // Load saved cart from sessionStorage
    const saved = sessionStorage.getItem("cart_items");
    if (saved) {
      this.items = JSON.parse(saved);
    }
  }

  // Add item or increase quantity
  addItem(product: Product) {
    const existing = this.items.find((p) => p.id === product.id);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    this.persist();
  }

  // Total cart value
  get total() {
    return this.items.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );
  }

  // Total number of items
  get count() {
    return this.items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  }

  // Save to sessionStorage
  persist() {
    sessionStorage.setItem("cart_items", JSON.stringify(this.items));
  }
}
