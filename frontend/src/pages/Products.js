import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { FaFilter, FaSortAmountDown, FaThLarge, FaList } from 'react-icons/fa';
import './Products.css';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Categories list
  const categories = ['All', 'Electronics', 'Clothing', 'Home & Kitchen', 'Beauty & Wellness', 'Sports & Fitness', 'Accessories'];

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const categoryParam = searchParams.get('category');
      const searchParam = searchParams.get('search');

      let url = '/api/products';
      const params = {};

      if (categoryParam && categoryParam !== 'All') {
        // Map URL category names to actual category names
        const categoryMap = {
          'Electronics': 'Electronics',
          'Fashion': 'Clothing',
          'Home': 'Home & Kitchen',
          'Beauty': 'Beauty & Wellness',
          'Sports': 'Sports & Fitness',
          'Accessories': 'Accessories'
        };
        params.category = categoryMap[categoryParam] || categoryParam;
        setActiveCategory(params.category);
      } else {
        setActiveCategory('All');
      }

      if (searchParam) {
        params.keyword = searchParam;
        setSearchText(searchParam);
      }

      const res = await axios.get(url, { params });
      let fetchedProducts = res.data.products || res.data;

      // Apply sorting
      fetchedProducts = sortProducts(fetchedProducts, sortBy);

      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortProducts = (productList, sortType) => {
    const sorted = [...productList];
    switch (sortType) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      default:
        return sorted;
    }
  };

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    const params = {};
    if (cat !== 'All') params.category = cat;
    if (searchText) params.search = searchText;
    setSearchParams(params);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = {};
    if (activeCategory !== 'All') params.category = activeCategory;
    if (searchText) params.search = searchText;
    setSearchParams(params);
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSortBy(newSort);
    setProducts(sortProducts(products, newSort));
  };

  return (
    <main className="products-page">
      <div className="container">
        {/* Page Header */}
        <div className="products-header">
          <div className="header-left">
            <h1>Our Collection</h1>
            {!loading && (
              <p className="results-count">
                Showing <strong>{products.length}</strong> products
                {activeCategory !== 'All' && <span> in {activeCategory}</span>}
              </p>
            )}
          </div>
          <form className="search-wrapper" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search for products..."
              value={searchText}
              onChange={handleSearchChange}
              className="search-input"
            />
          </form>
        </div>

        {/* Filters Bar */}
        <div className="filters-bar">
          <div className="category-tabs">
            {categories.map(cat => (
              <button
                key={cat}
                className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => handleCategoryClick(cat)}
              >
                {cat === 'Clothing' ? 'Fashion' : cat}
              </button>
            ))}
          </div>

          <div className="sort-controls">
            <div className="view-toggle">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <FaThLarge />
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <FaList />
              </button>
            </div>

            <div className="sort-dropdown">
              <FaSortAmountDown className="sort-icon" />
              <select value={sortBy} onChange={handleSortChange}>
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="loading-container">
            <div className="loading-grid">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton-image"></div>
                  <div className="skeleton-text"></div>
                  <div className="skeleton-text short"></div>
                  <div className="skeleton-price"></div>
                </div>
              ))}
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="no-products">
            <div className="no-products-icon">🔍</div>
            <h3>No products found</h3>
            <p>Try adjusting your search or filter criteria</p>
            <button className="btn btn-primary" onClick={() => handleCategoryClick('All')}>
              View All Products
            </button>
          </div>
        ) : (
          <div className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Products;
