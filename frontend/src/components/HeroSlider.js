import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import './HeroSlider.css';

// You would ideally import real images here
import hero1 from '../assets/hero_shopping.png';
import heroSmartphones from '../assets/hero_smartphones.png';
import heroFashion from '../assets/hero_fashion.png';
import heroHome from '../assets/hero_home.png';
import heroFitness from '../assets/hero_fitness.png';

const slides = [
    {
        id: 1,
        image: hero1,
        title: "Welcome to TrendHive",
        subtitle: "Discover premium products at unbeatable prices",
        btnText: "Start Shopping",
        btnLink: "/products",
        gradient: "linear-gradient(135deg, rgba(13, 148, 136, 0.9) 0%, rgba(15, 118, 110, 0.9) 100%)"
    },
    {
        id: 2,
        image: heroSmartphones,
        title: "Latest Smartphones",
        subtitle: "Upgrade to the future. Starting ₹9,999",
        btnText: "Explore Phones",
        btnLink: "/products?category=Electronics",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=600&fit=crop&q=80",
        title: "Fashion for Everyone",
        subtitle: "Best trends at unbeatable prices. Up to 60% off",
        btnText: "Shop Fashion",
        btnLink: "/products?category=Fashion",
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&h=600&fit=crop&q=80",
        title: "Home & Kitchen Essentials",
        subtitle: "Transform your space. Premium quality products",
        btnText: "Discover More",
        btnLink: "/products?category=Home",
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1600&h=600&fit=crop&q=80",
        title: "Fitness & Wellness",
        subtitle: "Start your fitness journey today. Free delivery",
        btnText: "Get Fit",
        btnLink: "/products?category=Sports",
        gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    }
];

const HeroSlider = () => {
    return (
        <div className="hero-slider-container">
            <Swiper
                modules={[Pagination, Autoplay, EffectFade, Navigation]}
                effect="fade"
                spaceBetween={0}
                slidesPerView={1}
                pagination={{ clickable: true }}
                navigation={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                className="hero-swiper"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div
                            className="swiper-slide-content"
                            style={{
                                background: slide.image
                                    ? `url(${slide.image}) center/cover no-repeat`
                                    : slide.gradient,
                            }}
                        >
                            <div className="slide-overlay">
                                <div className="slide-text animate-slide">
                                    <span className="slide-tag">Limited Time Offer</span>
                                    <h1>{slide.title}</h1>
                                    <p>{slide.subtitle}</p>
                                    <Link to={slide.btnLink} className="btn-shop-now">
                                        {slide.btnText}
                                        <span className="btn-arrow">→</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Promotional Strip */}
            <div className="promo-strip">
                <div className="promo-item">
                    <span className="promo-icon">🚚</span>
                    <span>Free Shipping on Orders ₹499+</span>
                </div>
                <div className="promo-item">
                    <span className="promo-icon">🔄</span>
                    <span>Easy 30-Day Returns</span>
                </div>
                <div className="promo-item">
                    <span className="promo-icon">🛡️</span>
                    <span>100% Secure Payments</span>
                </div>
                <div className="promo-item">
                    <span className="promo-icon">💎</span>
                    <span>Premium Quality Products</span>
                </div>
            </div>
        </div>
    );
};

export default HeroSlider;
