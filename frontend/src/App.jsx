import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Categories from './components/CategoriesPage';
import About from './components/About';
import Contact from './components/Contact';
import Account from './components/Account';
import Cart from './components/Cart';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import AuthProvider from './context/AuthProvider';
import ErrorBoundary from './ErrorBoundary';
import OrderHistory from "./pages/OrderHistory";
import ProductsPage from './pages/ProductPage';

import './index.css';

const App = () => {
  return (
    <>
      <Navbar />
      <div style={{ marginTop: '76px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<Account />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};


const AppWrapper = () => (
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <CartProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </CartProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

export default AppWrapper;
