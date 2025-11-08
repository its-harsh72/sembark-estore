import React from "react";
import { Link } from "react-router-dom";

// Displays a single product with its image, title, and price
interface ProductProps {
  id: number;
  title: string;
  image: string;
  price: number;
}

const ProductCard: React.FC<ProductProps> = ({ id, title, image, price }) => {
  return (
    <div
      className="border rounded-xl bg-white shadow-sm hover:shadow-lg p-4 flex flex-col"
      data-testid="product-card"
    >
      {/* Product image */}
      <img src={image} alt={title} className="h-40 w-full object-contain mb-3" />

      {/* Product title */}
      <h2 className="text-sm font-semibold line-clamp-2 mb-2">{title}</h2>

      {/* Product price */}
      <p className="font-bold mb-3">${price}</p>

      {/* Redirects to product detail page */}
      <Link
        to={`/product/${id}`}
        className="bg-blue-600 text-white py-1.5 rounded text-center hover:bg-blue-700 transition"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
