import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { FaStar, FaShoppingCart, FaBolt, FaTag, FaShieldAlt } from 'react-icons/fa';
import mockProducts from '../utils/mockProducts';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Image Zoom State
  const [backgroundPosition, setBackgroundPosition] = useState('0% 0%');

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchProduct = async () => {
    try {
      // Direct API call - we want to use the backend ID
      const res = await axios.get(`/api/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      // Fallback: Check mock data only if API fails (e.g. server down or dev mode without backend)
      const mockFallback = mockProducts.find(p => p._id === id);
      if (mockFallback) {
        setProduct(mockFallback);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  const handleAddToCart = async () => {
    const result = await addToCart(id, quantity);
    setMessage(result.message);
    if (!result.success && result.message.includes('login')) {
      setTimeout(() => navigate('/login'), 1500);
    }
  };

  if (loading) return <div className="loader container">Loading...</div>;
  if (!product) return <div className="error container">Product not found</div>;

  return (
    <div className="product-detail-container container">
      <div className="pd-wrapper">

        {/* Left Column: Images */}
        <div className="pd-image-section">
          <div
            className="main-image-container"
            onMouseMove={handleMouseMove}
            style={{
              backgroundImage: `url(${product.image})`,
              backgroundPosition: backgroundPosition
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              onError={(e) => {
                const fallbackUrl = 'https://placehold.co/600x600?text=TrendHive+Product';
                e.target.src = fallbackUrl;
                e.target.parentElement.style.backgroundImage = `url(${fallbackUrl})`;
              }}
            />
          </div>
          <div className="image-thumbnails">
            {/* Mock thumbnails since DB likely only has one image */}
            {[product.image, product.image].map((img, i) => (
              <div key={i} className={`thumbnail ${i === 0 ? 'active' : ''}`}>
                <img src={img} alt="thumb" />
              </div>
            ))}
          </div>
        </div>

        {/* Middle Column: Details */}
        <div className="pd-info-section">
          <h1 className="pd-title">{product.name}</h1>
          <div className="pd-rating">
            <span className="badge-rating">4.5 <FaStar /></span>
            <span className="text-muted">845 Ratings & 102 Reviews</span>
          </div>
          <p className="pd-price">
            <span className="price-curr">₹{product.price.toLocaleString('en-IN')}</span>
            <span className="price-orig">₹{Math.round(product.price * 1.3).toLocaleString('en-IN')}</span>
            <span className="price-disc">30% off</span>
          </p>

          <div className="pd-offers">
            <h4>Available Offers</h4>
            <ul>
              <li><FaTag className="offer-icon" /> <strong>Bank Offer</strong> 5% Unlimited Cashback on Axis Bank Credit Card</li>
              <li><FaTag className="offer-icon" /> <strong>Partner Offer</strong> Sign up for TrendHive Pay Later and get ₹500 Gift Card</li>
            </ul>
          </div>

          <div className="pd-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="pd-specs">
            <h3>Specifications</h3>
            <table>
              <tbody>
                <tr>
                  <td>Category</td>
                  <td>{product.category}</td>
                </tr>
                <tr>
                  <td>Stock Status</td>
                  <td style={{ color: product.stock > 0 ? 'green' : 'red', fontWeight: 'bold' }}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Buying Options (Sticky) */}
        <div className="pd-action-section">
          <div className="buy-box">
            <p className="delivery-info">
              Free delivery by <strong>Tomorrow, 10 PM</strong>
            </p>

            {product.stock > 0 ? (
              <h3 className="in-stock">In Stock</h3>
            ) : (
              <h3 className="out-stock">Out of Stock</h3>
            )}

            <div className="qty-selector">
              <label>Qty:</label>
              <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                {[...Array(Math.min(10, product.stock)).keys()].map(x => (
                  <option key={x + 1} value={x + 1}>{x + 1}</option>
                ))}
              </select>
            </div>

            <div className="action-buttons">
              <button onClick={handleAddToCart} className="btn-add-cart-full" disabled={product.stock === 0}>
                <FaShoppingCart /> Add to Cart
              </button>
              <button className="btn-buy-now-full" disabled={product.stock === 0}>
                <FaBolt /> Buy Now
              </button>
            </div>

            <div className="secure-trans">
              <FaShieldAlt /> Secure Transaction
            </div>
          </div>
        </div>

      </div>

      {message && (
        <div className={`toast-message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default ProductDetail;

