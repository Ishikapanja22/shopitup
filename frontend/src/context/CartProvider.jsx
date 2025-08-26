import React, { useState } from 'react';
import { CartContext } from '../hooks/useCart'; 

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([
    
  ]);
const addToCart = (item) => {
  setCartItems((prev) => {
    const exists = prev.find((i) => i.id === item.id);
    if (exists) {
      return prev.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
      );
    }
    return [...prev, item];
  });
};

  const clearCart = () => setCartItems([]);

  const getTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
const removeFromCart = (id) => {
  setCartItems((prev) => prev.filter((item) => item.id !== id));
};
  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, clearCart, getTotal,removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
