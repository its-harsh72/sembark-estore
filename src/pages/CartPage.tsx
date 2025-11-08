import React from "react";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

// Shows all items in the user's cart
const Cart: React.FC = () => {
  const { cart, removeFromCart, total } = useCart();

  // Show message if cart is empty
  if (cart.length === 0)
    return (
      <motion.p
        className="text-center p-10 text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Your cart is empty.
      </motion.p>
    );

  return (
    <motion.div
      className="p-6 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h1>

      <AnimatePresence>
        {cart.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex items-center justify-between border p-4 rounded-lg bg-white shadow-md hover:shadow-lg"
          >
            {/* Product info */}
            <div className="flex items-center gap-4">
              <motion.img
                src={item.image}
                alt={item.title}
                className="h-16 w-16 object-contain"
                whileHover={{ scale: 1.05 }}
              />
              <div>
                <h2 className="font-semibold text-gray-700">{item.title}</h2>
                <p className="text-gray-600">
                  ${item.price} × {item.quantity}
                </p>
              </div>
            </div>

            {/* Remove item button */}
            <motion.button
              whileHover={{ scale: 1.1, color: "#dc2626" }}
              whileTap={{ scale: 0.9 }}
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              Remove
            </motion.button>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Total amount */}
      <motion.div
        key={total}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-6 text-right"
      >
        <p className="text-xl font-bold text-gray-800">
          Total:{" "}
          <motion.span
            key={total}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-blue-600"
          >
            ${total.toFixed(2)}
          </motion.span>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Cart;
