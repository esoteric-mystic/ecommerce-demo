import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { indianStates } from '../utils/indianStates';
import './Checkout.css';

const Checkout = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: 'India'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get('/api/cart');
      setCart(res.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setProcessing(true);

    try {
      const shippingAddress = {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        pinCode: formData.pinCode,
        country: formData.country
      };

      await axios.post('/api/orders', { shippingAddress });
      navigate('/orders');
    } catch (error) {
      setError(error.response?.data?.message || 'Error processing order');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <main>
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </main>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <main>
        <div className="container">
          <div className="card">
            <h2>Your cart is empty</h2>
            <button onClick={() => navigate('/products')} className="btn btn-primary">
              Continue Shopping
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="container">
        <h1>Checkout</h1>
        <div className="checkout-container">
          <div className="checkout-form">
            <div className="card">
              <h2>Shipping Address</h2>
              {error && <div className="error">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Street Address</label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select State</option>
                    {indianStates.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>PIN Code</label>
                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{6}"
                    maxLength="6"
                    placeholder="6-digit PIN code"
                  />
                </div>
                <div className="form-group">
                  <label>Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    readOnly
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={processing}
                  style={{ width: '100%' }}
                >
                  {processing ? 'Processing...' : 'Place Order'}
                </button>
              </form>
            </div>
          </div>
          <div className="checkout-summary">
            <div className="card">
              <h2>Order Summary</h2>
              {cart.items.map(item => (
                <div key={item._id} className="checkout-item">
                  <div>
                    <strong>{item.product.name}</strong>
                    <p>Qty: {item.quantity} × ₹{item.product.price}</p>
                  </div>
                  <div>₹{(item.product.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
              <div className="checkout-total">
                <span>Total:</span>
                <span>₹{calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;

