import React, { useMemo, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaStar, FaHeart, FaShoppingCart, FaCheck, FaBolt, FaTruck, FaTimes, FaSignInAlt } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');
    const [showLoginModal, setShowLoginModal] = useState(false);

    // Memoize random values so they don't change on re-render
    const { rating, reviews, originalPrice, discount, isBestseller, hasExpressDelivery } = useMemo(() => {
        const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
        const reviews = Math.floor(Math.random() * 5000) + 100;
        const originalPrice = Math.round(product.price * (1.2 + Math.random() * 0.3));
        const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100);
        const isBestseller = product.isBestseller || Math.random() > 0.7;
        const hasExpressDelivery = Math.random() > 0.5;
        return { rating, reviews, originalPrice, discount, isBestseller, hasExpressDelivery };
    }, [product.price, product.isBestseller]);

    const handleAddToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Check if user is logged in
        if (!user) {
            setShowLoginModal(true);
            return;
        }

        // User is logged in, proceed with adding to cart
        const result = await addToCart(product._id);

        if (result.success) {
            setToastType('success');
            setToastMessage('Added to cart! 🛒');
        } else {
            setToastType('error');
            setToastMessage(result.message || 'Failed to add to cart');
        }

        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
    };

    const formatReviews = (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num;
    };

    return (
        <>
            <div className="product-card-pro">
                {/* Badges */}
                <div className="product-badges">
                    {isBestseller && (
                        <span className="badge badge-bestseller">
                            <FaBolt /> Bestseller
                        </span>
                    )}
                    {discount >= 20 && (
                        <span className="badge badge-deal">
                            {discount}% OFF
                        </span>
                    )}
                </div>

                <div className="product-wishlist-btn">
                    <FaHeart />
                </div>

                <Link to={`/products/${product._id}`} className="product-img-container">
                    <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://placehold.co/400x400/f8f9fa/6c757d?text=TrendHive';
                        }}
                    />
                </Link>

                <div className="product-details">
                    <Link to={`/products/${product._id}`} className="product-title">
                        {product.name}
                    </Link>

                    <div className="product-rating">
                        <span className="rating-badge">{rating} <FaStar className="star-icon" /></span>
                        <span className="review-count">({formatReviews(reviews)})</span>
                        <span className="assured-badge" title="ShopMax Assured">
                            <FaCheck className="assured-icon" /> Assured
                        </span>
                    </div>

                    <div className="product-price-row">
                        <span className="current-price">₹{product.price.toLocaleString('en-IN')}</span>
                        <span className="original-price">₹{originalPrice.toLocaleString('en-IN')}</span>
                        <span className="discount-tag">{discount}% off</span>
                    </div>

                    <div className="delivery-info">
                        {hasExpressDelivery ? (
                            <p className="express-delivery">
                                <FaTruck className="delivery-icon" /> Express Delivery
                            </p>
                        ) : (
                            <p className="free-delivery">Free delivery</p>
                        )}
                    </div>

                    {/* Hover Action */}
                    <div className="product-hover-action">
                        <button className="btn-add-cart" onClick={handleAddToCart}>
                            <FaShoppingCart /> Add to Cart
                        </button>
                    </div>
                </div>

                {/* Toast Notification */}
                {showToast && (
                    <div className={`product-toast ${toastType}`}>
                        {toastType === 'success' ? <FaCheck /> : <FaTimes />}
                        <span>{toastMessage}</span>
                    </div>
                )}
            </div>

            {/* Login Modal */}
            {showLoginModal && (
                <div className="login-modal-overlay" onClick={() => setShowLoginModal(false)}>
                    <div className="login-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="login-modal-close" onClick={() => setShowLoginModal(false)}>
                            <FaTimes />
                        </button>
                        <div className="login-modal-icon">
                            <FaSignInAlt />
                        </div>
                        <h3>Login Required</h3>
                        <p>Please login or create an account to add items to your cart.</p>
                        <div className="login-modal-actions">
                            <button
                                className="btn-login-modal"
                                onClick={() => {
                                    setShowLoginModal(false);
                                    navigate('/login');
                                }}
                            >
                                Login
                            </button>
                            <button
                                className="btn-signup-modal"
                                onClick={() => {
                                    setShowLoginModal(false);
                                    navigate('/register');
                                }}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductCard;
