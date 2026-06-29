import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, loading: contextLoading } = useCart();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems) {
      setLoading(false);
    }
  }, [cartItems]);

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const res = await axios.put(`/api/cart/items/${itemId}`, {
        quantity: newQuantity
      });
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || 'Error updating quantity');
    }
  };

  const removeItem = async (itemId) => {
    await removeFromCart(itemId);
  };

  const calculateTotal = () => {
    if (!cartItems) return 0;
    return cartItems.reduce((total, item) => {
      if (!item.product) return total;
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  if (loading || contextLoading) {
    return (
      <main>
        <div className="container">
          <div className="loading">Loading cart...</div>
        </div>
      </main>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <main>
        <div className="container">
          <div className="card empty-cart-card">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven't added anything yet</p>
            <Link to="/products" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="container">
        <h1>Shopping Cart</h1>
        <div className="cart-container">
          <div className="cart-items">
            {cartItems.map(item => {
              if (!item.product) return null;
              return (
                <div key={item._id} className="cart-item">
                  <img src={item.product.image} alt={item.product.name} />
                  <div className="cart-item-info">
                    <h3>{item.product.name}</h3>
                    <p>₹{item.product.price}</p>
                  </div>
                  <div className="cart-item-quantity">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="btn-quantity"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="btn-quantity"
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-total">
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </div>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="btn btn-danger"
                    style={{ padding: '5px 10px' }}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
          <div className="cart-summary">
            <div className="card">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{calculateTotal().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>₹{calculateTotal().toFixed(2)}</span>
              </div>
              <button
                onClick={() => navigate('/checkout')}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '20px' }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;

