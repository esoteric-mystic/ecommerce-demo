import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaCcVisa, FaCcMastercard, FaCcPaypal, FaGooglePay, FaApple, FaGooglePlay } from 'react-icons/fa';
import { SiPaytm } from 'react-icons/si';
import './Footer.css';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="footer">
            <div className="footer-back-to-top" onClick={scrollToTop}>
                <span>↑ Back to top</span>
            </div>

            <div className="container footer-content">
                <div className="footer-column">
                    <h3>Get to Know Us</h3>
                    <ul>
                        <li><Link to="/about">About TrendHive</Link></li>
                        <li><Link to="/careers">Careers</Link></li>
                        <li><Link to="/press">Press Releases</Link></li>
                        <li><Link to="/investor">Investor Relations</Link></li>
                        <li><Link to="/sustainability">Sustainability</Link></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>Connect with Us</h3>
                    <div className="social-links">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook /> Facebook
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter /> Twitter
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram /> Instagram
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                            <FaYoutube /> Youtube
                        </a>
                    </div>
                </div>

                <div className="footer-column">
                    <h3>Make Money with Us</h3>
                    <ul>
                        <li><Link to="/sell">Sell on TrendHive</Link></li>
                        <li><Link to="/affiliate">Become an Affiliate</Link></li>
                        <li><Link to="/advertise">Advertise Your Products</Link></li>
                        <li><Link to="/fulfillment">Fulfillment by TrendHive</Link></li>
                        <li><Link to="/partner">TrendHive Pay Partner</Link></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>Let Us Help You</h3>
                    <ul>
                        <li><Link to="/account">Your Account</Link></li>
                        <li><Link to="/orders">Track Your Order</Link></li>
                        <li><Link to="/returns">Returns Centre</Link></li>
                        <li><Link to="/warranty">Warranty & Support</Link></li>
                        <li><Link to="/help">Help Centre</Link></li>
                    </ul>
                </div>
            </div>

            {/* Payment & App Section */}
            <div className="footer-middle">
                <div className="container footer-middle-content">
                    <div className="payment-methods">
                        <h4>Payment Partners</h4>
                        <div className="payment-icons">
                            <FaCcVisa className="payment-icon" title="Visa" />
                            <FaCcMastercard className="payment-icon" title="Mastercard" />
                            <FaCcPaypal className="payment-icon" title="PayPal" />
                            <FaGooglePay className="payment-icon" title="Google Pay" />
                            <SiPaytm className="payment-icon" title="Paytm" />
                        </div>
                    </div>

                    <div className="app-download">
                        <h4>Download Our App</h4>
                        <div className="app-buttons">
                            <a href="/#" className="app-btn">
                                <FaApple />
                                <span>
                                    <small>Download on the</small>
                                    <strong>App Store</strong>
                                </span>
                            </a>
                            <a href="/#" className="app-btn">
                                <FaGooglePlay />
                                <span>
                                    <small>Get it on</small>
                                    <strong>Google Play</strong>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container footer-bottom-content">
                    <p>&copy; {new Date().getFullYear()} TrendHive India Pvt. Ltd. All rights reserved.</p>
                    <div className="footer-links">
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms of Use</Link>
                        <Link to="/cookies">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
