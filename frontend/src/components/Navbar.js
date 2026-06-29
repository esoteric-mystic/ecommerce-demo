import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes, FaSignOutAlt, FaChartLine, FaHome, FaBoxOpen, FaTags, FaHeadset } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${searchTerm}`);
      setMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="navbar-container">
      {/* Top Navbar */}
      <div className="navbar-top">
        <div className="container nav-content-top">
          {/* Mobile: Hamburger Menu */}
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle Menu">
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Logo */}
          <Link to="/" className="nav-logo">
            <span className="logo-icon">🛒</span>
            <span className="logo-text">TrendHive</span>
          </Link>

          {/* Desktop Search Bar */}
          <form className="nav-search desktop-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit"><FaSearch /></button>
          </form>

          {/* Nav Actions */}
          <div className="nav-actions">
            {user ? (
              <div className="nav-user-menu group">
                <div className="nav-item">
                  <FaUser className="nav-icon" />
                  <span className="user-name-text">{user.name}</span>
                </div>
                <div className="dropdown-menu">
                  {user.role === 'admin' ? (
                    <>
                      <Link to="/admin"><FaChartLine /> Dashboard</Link>
                      <Link to="/admin/products"><FaBoxOpen /> Products</Link>
                      <Link to="/admin/orders"><FaTags /> Orders</Link>
                    </>
                  ) : (
                    <>
                      <Link to="/orders"><FaBoxOpen /> My Orders</Link>
                      <Link to="/profile"><FaUser /> Profile</Link>
                    </>
                  )}
                  <button onClick={handleLogout}><FaSignOutAlt /> Logout</button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="nav-login-btn">
                Login
              </Link>
            )}

            <Link to="/cart" className="nav-cart">
              <FaShoppingCart className="nav-icon" />
              <span className="cart-text">Cart</span>
              {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar - Below the main row */}
        <div className="mobile-search-container">
          <form className="nav-search mobile-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit"><FaSearch /></button>
          </form>
        </div>
      </div>

      {/* Bottom Navbar (Categories) - Desktop Only */}
      <div className="navbar-bottom desktop-only">
        <div className="container nav-links-bottom">
          <Link to="/products" className="category-item"><FaBars /> All Categories</Link>
          <Link to="/products?category=Electronics">Electronics</Link>
          <Link to="/products?category=Fashion">Fashion</Link>
          <Link to="/products?category=Home">Home</Link>
          <Link to="/products?category=Beauty">Beauty</Link>
          <Link to="/products">Today's Deals</Link>
          <Link to="/customer-service">Customer Service</Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}></div>

      {/* Mobile Side Menu */}
      <div className={`mobile-side-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <h3>Menu</h3>
          <button onClick={toggleMobileMenu}><FaTimes /></button>
        </div>
        <div className="mobile-menu-links">
          <Link to="/" onClick={toggleMobileMenu}><FaHome /> Home</Link>
          <Link to="/products" onClick={toggleMobileMenu}><FaBoxOpen /> All Products</Link>
          <Link to="/products?category=Electronics" onClick={toggleMobileMenu}>📱 Electronics</Link>
          <Link to="/products?category=Fashion" onClick={toggleMobileMenu}>👗 Fashion</Link>
          <Link to="/products?category=Home" onClick={toggleMobileMenu}>🏠 Home</Link>
          <Link to="/products?category=Beauty" onClick={toggleMobileMenu}>💄 Beauty</Link>
          <Link to="/customer-service" onClick={toggleMobileMenu}><FaHeadset /> Customer Service</Link>

          {user ? (
            <>
              <Link to="/profile" onClick={toggleMobileMenu}><FaUser /> My Profile</Link>
              <Link to="/orders" onClick={toggleMobileMenu}><FaBoxOpen /> My Orders</Link>
              <button className="mobile-logout-btn" onClick={handleLogout}><FaSignOutAlt /> Logout</button>
            </>
          ) : (
            <Link to="/login" className="mobile-login-btn" onClick={toggleMobileMenu}>
              Login / Sign Up
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
