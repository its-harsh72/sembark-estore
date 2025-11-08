import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

// Structure of a single product
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

// Displays details of a selected product
const ProductDetail: React.FC = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart, removeFromCart, cart } = useCart();

  // Check if the product is already in the cart
  const isInCart = cart.some((item) => item.id === Number(id));

  // Fetch product details on load
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  // Loading state
  if (!product)
    return (
      <motion.p
        className="text-center p-10 text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Loading...
      </motion.p>
    );

  return (
    <motion.div
      className="p-6 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Back to Home */}
      <Link
        to="/"
        className="inline-block bg-gray-200 px-3 py-1 rounded text-sm hover:bg-gray-300 mb-4"
      >
        ← Back to Home
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Product image */}
        <motion.img
          src={product.image}
          alt={product.title}
          className="h-72 object-contain mx-auto"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        />

        {/* Product info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-semibold mb-4">${product.price}</p>

          {/* Add / Remove Cart Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={() =>
              isInCart
                ? removeFromCart(product.id)
                : addToCart({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                  })
            }
            className={`px-4 py-2 rounded text-white font-medium transition ${
              isInCart
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isInCart ? "Remove from Cart" : "Add to Cart"}
          </motion.button>

          {/* Already in cart message */}
          {isInCart && (
            <motion.p
              key={product.id}
              className="text-sm text-green-600 mt-2"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              ✔ This product is already in your cart.
            </motion.p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
