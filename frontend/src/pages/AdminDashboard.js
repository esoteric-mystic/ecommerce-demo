import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        axios.get('/api/products/admin/all'),
        axios.get('/api/orders/all')  
      ]);

      const products = productsRes.data;
      const orders = ordersRes.data;

      const totalRevenue = orders
        .filter(o => o.paymentStatus === 'paid')
        .reduce((sum, o) => sum + o.totalAmount, 0);

      const pendingOrders = orders.filter(o => o.status === 'pending').length;

      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        totalRevenue,
        pendingOrders
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main>
        <div className="container">
          <div className="loading">Loading dashboard...</div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="container">
        <h1>Admin Dashboard</h1>
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Total Products</h3>
            <p className="stat-value">{stats.totalProducts}</p>
            <Link to="/admin/products" className="stat-link">Manage Products →</Link>
          </div>
          <div className="stat-card">
            <h3>Total Orders</h3>
            <p className="stat-value">{stats.totalOrders}</p>
            <Link to="/admin/orders" className="stat-link">View Orders →</Link>
          </div>
          <div className="stat-card">
            <h3>Total Revenue</h3>
            <p className="stat-value">₹{stats.totalRevenue.toFixed(2)}</p>
          </div>
          <div className="stat-card">
            <h3>Pending Orders</h3>
            <p className="stat-value">{stats.pendingOrders}</p>
            <Link to="/admin/orders" className="stat-link">View Orders →</Link>
          </div>
        </div>
        <div className="dashboard-actions">
          <Link to="/admin/products" className="btn btn-primary">
            Manage Products
          </Link>
          <Link to="/admin/orders" className="btn btn-secondary">
            View All Orders
          </Link>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;

