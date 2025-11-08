import { AnimatePresence, motion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";

const App: React.FC = () => {
  const location = useLocation(); // Gives current route info

  return (
    // Provides cart state to the whole app
    <CartProvider>
      <Navbar /> {/* Common navigation bar */}

      {/* Smooth page transitions using Framer Motion */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </CartProvider>
  );
};

export default App;
