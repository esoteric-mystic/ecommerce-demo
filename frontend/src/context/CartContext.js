import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Fetch cart when user logs in
    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            setCartItems([]);
        }
    }, [user]);

    const fetchCart = async () => {
        try {
            const res = await axios.get('/api/cart');
            // Assuming API returns { items: [...] } or just [...]
            setCartItems(res.data.items || res.data);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        if (!user) {
            return { success: false, message: 'Please login to add items to cart' };
        }

        setLoading(true);
        try {
            const res = await axios.post('/api/cart/items', {
                productId,
                quantity: parseInt(quantity)
            });

            // Update local state if API returns updated cart
            if (res.data.items) {
                setCartItems(res.data.items);
            } else {
                // Fallback: refetch
                fetchCart();
            }

            const msg = 'Product added to cart!';
            setMessage(msg);
            setTimeout(() => setMessage(''), 3000);
            return { success: true, message: msg };
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Error adding to cart';
            setMessage(errorMsg);
            setTimeout(() => setMessage(''), 3000);
            return { success: false, message: errorMsg };
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            await axios.delete(`/api/cart/items/${itemId}`);
            fetchCart();
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, loading, message }}>
            {children}
        </CartContext.Provider>
    );
};
