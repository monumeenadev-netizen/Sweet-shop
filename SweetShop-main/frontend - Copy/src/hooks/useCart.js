import { useState, useEffect } from 'react';
import { cartAPI } from '../utils/api';

export const useCart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      setLoading(true);
      const { data } = await cartAPI.getCart();
      setCart(data.cart);
    } catch (error) {
      if (error.response?.status !== 401) {
        console.error('Failed to fetch cart:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (sweetId, quantity) => {
    try {
      const { data } = await cartAPI.addToCart(sweetId, quantity);
      setCart(data.cart);
      return true;
    } catch (error) {
      console.error('Failed to add to cart:', error);
      return false;
    }
  };

  const updateCartItem = async (sweetId, quantity) => {
    try {
      const { data } = await cartAPI.updateCartItem(sweetId, quantity);
      setCart(data.cart);
      return true;
    } catch (error) {
      console.error('Failed to update cart:', error);
      return false;
    }
  };

  const removeFromCart = async (sweetId) => {
    try {
      const { data } = await cartAPI.removeFromCart(sweetId);
      setCart(data.cart);
      return true;
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      return false;
    }
  };

  const clearCart = async () => {
    try {
      const { data } = await cartAPI.clearCart();
      setCart(data.cart);
      return true;
    } catch (error) {
      console.error('Failed to clear cart:', error);
      return false;
    }
  };

  const getCartTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  };

  return {
    cart,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
    fetchCart,
  };
};
