import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminOrders.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('/api/orders/all');
      setOrders(res.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`/api/orders/${orderId}/status`, { status: newStatus });
      fetchOrders();
    } catch (error) {
      alert('Error updating order status');
    }
  };

  if (loading) {
    return (
      <main>
        <div className="container">
          <div className="loading">Loading orders...</div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="container">
        <h1>All Orders</h1>
        {orders.length === 0 ? (
          <div className="card">
            <p>No orders found.</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order._id} className="card order-card">
                <div className="order-header">
                  <div>
                    <strong>Order #{order._id.slice(-8)}</strong>
                    <p>Customer: {order.user?.name || 'N/A'} ({order.user?.email || 'N/A'})</p>
                    <p>Placed on {new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="order-status-section">
                    <div className="status-select">
                      <label>Status:</label>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        className="status-dropdown"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                    <div className="payment-status">
                      Payment: <span className={`payment-${order.paymentStatus}`}>
                        {order.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <span>{item.name} × {item.quantity}</span>
                      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="order-footer">
                  <div className="order-total">
                    <strong>Total: ₹{order.totalAmount.toFixed(2)}</strong>
                  </div>
                  <div className="order-address">
                    <p><strong>Shipping Address:</strong></p>
                    <p>
                      {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pinCode}, {order.shippingAddress.country}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminOrders;

