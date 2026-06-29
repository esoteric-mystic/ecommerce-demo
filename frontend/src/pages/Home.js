import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import './Home.css';

// Assets
import catElectronics from '../assets/cat_electronics.png';
import catFashion from '../assets/cat_fashion.png';
import catHome from '../assets/cat_home.png';
import catBeauty from '../assets/cat_beauty.png';
import catSports from '../assets/cat_sports.png';
import catAccessories from '../assets/cat_accessories.png';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { name: 'Electronics', image: catElectronics, link: '/products?category=Electronics', icon: '📱' },
    { name: 'Fashion', image: catFashion, link: '/products?category=Fashion', icon: '👗' },
    { name: 'Home & Kitchen', image: catHome, link: '/products?category=Home', icon: '🏠' },
    { name: 'Beauty', image: catBeauty, link: '/products?category=Beauty', icon: '💄' },
    { name: 'Sports', image: catSports, link: '/products?category=Sports', icon: '🏋️' },
    { name: 'Accessories', image: catAccessories, link: '/products?category=Accessories', icon: '👜' },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      setProducts(res.data.products || res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProductsByCategory = (category) => {
    return products.filter(p => p.category === category || (category === 'Home' && p.category === 'Home & Kitchen')).slice(0, 5);
  };

  const getBestsellers = () => {
    return products.filter(p => p.isBestseller || Math.random() > 0.5).slice(0, 5);
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <HeroSlider />

      {/* Categories Circle Row (Flipkart Style) */}
      <section className="categories-circle-section">
        <div className="container">
          <div className="category-scroll">
            {categories.map((cat, index) => (
              <Link to={cat.link} key={index} className="circle-cat-item">
                <div className="circle-image">
                  <img src={cat.image} alt={cat.name} />
                </div>
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Deal of the Day Banner - Compact Premium Edition */}
      <section className="deal-banner-compact">
        <div className="deal-content">
          <div className="deal-badge-compact">
            <span className="pulse-dot"></span>
            <span>DEAL OF THE DAY</span>
          </div>

          <h2 className="deal-headline">
            <span className="discount-highlight">UP TO 70% OFF</span>
            Electronics Sale
          </h2>

          <p className="deal-subtext">
            Premium gadgets at unbeatable prices. <strong>Free delivery</strong> on ₹999+
          </p>

          <div className="deal-timer-compact">
            <div className="time-box"><span>23</span><small>HRS</small></div>
            <span className="colon">:</span>
            <div className="time-box"><span>45</span><small>MIN</small></div>
            <span className="colon">:</span>
            <div className="time-box"><span>12</span><small>SEC</small></div>
          </div>

          <Link to="/products?category=Electronics" className="deal-cta">
            Shop Now <span className="arrow">→</span>
          </Link>
        </div>

        <div className="deal-image-container">
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&q=80"
            alt="Premium Headphones"
            className="deal-product-img"
          />
          <div className="deal-price-badge">
            <span className="old">₹24,999</span>
            <span className="new">₹7,499</span>
          </div>
        </div>
      </section>


      {/* Bestsellers Section */}
      <section className="deals-section container">
        <div className="section-header" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=300&fit=crop&q=80')" }}>
          <div className="header-overlay"></div>
          <div className="section-title">
            <h2>
              <span className="section-icon">🔥</span>
              Bestsellers
            </h2>
            <p className="section-subtitle">Most loved by our customers</p>
          </div>
          <Link to="/products" className="btn-view-all">View All</Link>
        </div>
        <div className="deals-grid">
          {loading ? <p>Loading...</p> : getBestsellers().map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Best of Electronics Section */}
      <section className="deals-section container section-alt">
        <div className="section-header" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=300&fit=crop&q=80')" }}>
          <div className="header-overlay"></div>
          <div className="section-title">
            <h2>
              <span className="section-icon">💻</span>
              Best of Electronics
            </h2>
            <p className="section-subtitle">Top picks in gadgets & tech</p>
          </div>
          <Link to="/products?category=Electronics" className="btn-view-all">View All</Link>
        </div>
        <div className="deals-grid">
          {loading ? <p>Loading...</p> : getProductsByCategory('Electronics').map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Promo Banner Grid - Premium */}
      <section className="promo-grid container">
        <div
          className="promo-card promo-fashion"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=400&fit=crop&q=80')" }}
        >
          <div className="promo-overlay"></div>
          <div className="promo-content">
            <span className="promo-tag">New Arrivals</span>
            <h3>Fashion Week Sale</h3>
            <p>Flat 50% off on all clothing</p>
            <Link to="/products?category=Fashion" className="promo-btn">
              Shop Fashion <span className="btn-icon">→</span>
            </Link>
          </div>
        </div>
        <div
          className="promo-card promo-home"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&q=80')" }}
        >
          <div className="promo-overlay"></div>
          <div className="promo-content">
            <span className="promo-tag">Special Offer</span>
            <h3>Home Essentials</h3>
            <p>Starting from ₹499</p>
            <Link to="/products?category=Home" className="promo-btn">
              Explore <span className="btn-icon">→</span>
            </Link>
          </div>
        </div>
        <div
          className="promo-card promo-beauty"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop&q=80')" }}
        >
          <div className="promo-overlay"></div>
          <div className="promo-content">
            <span className="promo-tag">Beauty Sale</span>
            <h3>Glow Up</h3>
            <p>Premium skincare at 40% off</p>
            <Link to="/products?category=Beauty" className="promo-btn">
              Shop Beauty <span className="btn-icon">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Fashion Top Picks */}
      <section className="deals-section container">
        <div className="section-header" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=300&fit=crop&q=80')" }}>
          <div className="header-overlay"></div>
          <div className="section-title">
            <h2>
              <span className="section-icon">👗</span>
              Fashion Top Picks
            </h2>
            <p className="section-subtitle">Trending styles for you</p>
          </div>
          <Link to="/products?category=Fashion" className="btn-view-all">View All</Link>
        </div>
        <div className="deals-grid">
          {loading ? <p>Loading...</p> : getProductsByCategory('Clothing').map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Home & Kitchen Essentials */}
      <section className="deals-section container section-alt">
        <div className="section-header" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=300&fit=crop&q=80')" }}>
          <div className="header-overlay"></div>
          <div className="section-title">
            <h2>
              <span className="section-icon">🏠</span>
              Home & Kitchen
            </h2>
            <p className="section-subtitle">Make your home beautiful</p>
          </div>
          <Link to="/products?category=Home" className="btn-view-all">View All</Link>
        </div>
        <div className="deals-grid">
          {loading ? <p>Loading...</p> : getProductsByCategory('Home').map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section container">
        <div className="feature-grid">
          <div className="feature-item">
            <div className="feature-icon">🚀</div>
            <h3>Fast Delivery</h3>
            <p>Free delivery on orders above ₹499</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🛡️</div>
            <h3>Secure Payment</h3>
            <p>100% secure payment gateway</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🎧</div>
            <h3>24/7 Support</h3>
            <p>Dedicated customer support</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">💰</div>
            <h3>Best Prices</h3>
            <p>Price match guarantee</p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container newsletter-content">
          <div className="newsletter-text">
            <h2>Subscribe & Get 10% Off</h2>
            <p>Join our newsletter for exclusive deals and updates</p>
          </div>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email address" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
