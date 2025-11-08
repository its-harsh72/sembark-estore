import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

// Simple navigation bar showing site links and cart summary
const Navbar: React.FC = () => {
  const { cart, total } = useCart(); // Access cart items and total from context

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center">
      {/* Logo - redirects to home */}
      <Link to="/" className="text-lg font-semibold text-blue-600">
        🛍️ Store
      </Link>

      <div className="flex items-center gap-5 text-sm font-medium">
        {/* Home link */}
        <Link to="/" className="text-gray-700 hover:text-blue-600">
          Home
        </Link>

        {/* Cart link showing item count and total price */}
        <Link
          to="/cart"
          className="flex items-center gap-1 text-gray-700 hover:text-blue-600"
        >
          <span>Cart</span>
          <span
            data-testid="cart-count"
            className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-xs"
          >
            {cart.length}
          </span>
          <span className="text-xs text-gray-500 ml-1">
            (${total.toFixed(2)})
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
