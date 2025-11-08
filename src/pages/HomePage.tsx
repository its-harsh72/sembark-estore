import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";

// Defines product structure
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

// Shows all products with category and sort filters
const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sort, setSort] = useState("");

  // Fetch all products on first render
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
      setFiltered(data);
      setCategories(Array.from(new Set(data.map((p: Product) => p.category))));
    };
    fetchProducts();
  }, []);

  // Update list when category or sort changes
  useEffect(() => {
    let updated = [...products];
    if (selectedCategory) {
      updated = updated.filter((p) => p.category === selectedCategory);
    }
    if (sort === "low") {
      updated.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      updated.sort((a, b) => b.price - a.price);
    }
    setFiltered(updated);
  }, [selectedCategory, sort, products]);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Filter bar for category & sorting */}
        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onSortChange={setSort}
        />

        {/* Product grid */}
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
          {filtered.length > 0 ? (
            filtered.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                title={p.title}
                image={p.image}
                price={p.price}
              />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
