import React, { useState } from 'react';
import { FaHeadset, FaQuestionCircle, FaEnvelope, FaPhone, FaBoxOpen, FaCreditCard } from 'react-icons/fa';
import './CustomerService.css';

const CustomerService = () => {
    const [activeTab, setActiveTab] = useState('faq');

    const faqs = [
        {
            question: "How do I track my order?",
            answer: "You can track your order by visiting the 'My Orders' section in your profile. Click on the specific order to see its current status and tracking details."
        },
        {
            question: "What is the return policy?",
            answer: "We offer a 30-day return policy for most items. Products must be unused and in their original packaging. Please visit our Returns center to initiate a return."
        },
        {
            question: "How can I pay for my order?",
            answer: "We accept Credit/Debit cards (Visa, Mastercard), Net Banking, UPI, and Cash on Delivery (COD) for eligible pin codes."
        },
        {
            question: "I received a damaged item. What should I do?",
            answer: "We apologize for the inconvenience. Please contact our support team within 48 hours of delivery with photos of the damaged product, and we will arrange a replacement or refund."
        }
    ];

    return (
        <div className="cs-container">
            <div className="cs-header">
                <h1>24/7 Customer Support</h1>
                <p>We are here to help you with any questions or issues.</p>
            </div>

            <div className="cs-content container">
                {/* Sidebar / Tabs */}
                <div className="cs-sidebar">
                    <button
                        className={`cs-tab ${activeTab === 'faq' ? 'active' : ''}`}
                        onClick={() => setActiveTab('faq')}
                    >
                        <FaQuestionCircle /> FAQs
                    </button>
                    <button
                        className={`cs-tab ${activeTab === 'contact' ? 'active' : ''}`}
                        onClick={() => setActiveTab('contact')}
                    >
                        <FaHeadset /> Contact Us
                    </button>
                    <button
                        className={`cs-tab ${activeTab === 'shipping' ? 'active' : ''}`}
                        onClick={() => setActiveTab('shipping')}
                    >
                        <FaBoxOpen /> Shipping & Returns
                    </button>
                </div>

                {/* content Area */}
                <div className="cs-main">

                    {activeTab === 'faq' && (
                        <div className="cs-section slide-in">
                            <h2>Frequently Asked Questions</h2>
                            <div className="faq-list">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="faq-item">
                                        <h4>{faq.question}</h4>
                                        <p>{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'contact' && (
                        <div className="cs-section slide-in">
                            <h2>Contact Support</h2>
                            <div className="contact-cards">
                                <div className="contact-card">
                                    <div className="icon-wrapper"><FaPhone /></div>
                                    <h3>Phone Support</h3>
                                    <p>Call us 24/7 at:</p>
                                    <a href="tel:1800-123-4567" className="contact-link">1800-123-4567</a>
                                </div>
                                <div className="contact-card">
                                    <div className="icon-wrapper"><FaEnvelope /></div>
                                    <h3>Email Support</h3>
                                    <p>Send us an email:</p>
                                    <a href="mailto:support@trendhive.com" className="contact-link">support@trendhive.com</a>
                                </div>
                            </div>

                            <div className="contact-form-wrapper">
                                <h3>Send us a Message</h3>
                                <form className="cs-form">
                                    <div className="form-row">
                                        <input type="text" placeholder="Your Name" />
                                        <input type="email" placeholder="Your Email" />
                                    </div>
                                    <input type="text" placeholder="Subject" />
                                    <textarea placeholder="Describe your issue..." rows="5"></textarea>
                                    <button type="submit" className="cs-submit-btn">Send Message</button>
                                </form>
                            </div>
                        </div>
                    )}

                    {activeTab === 'shipping' && (
                        <div className="cs-section slide-in">
                            <h2>Shipping & Returns Policy</h2>
                            <div className="policy-block">
                                <h3><FaBoxOpen /> Shipping Policy</h3>
                                <p>We strive to deliver your orders as quickly as possible. Standard delivery takes 3-5 business days.</p>
                                <ul>
                                    <li>Free shipping on orders over ₹499.</li>
                                    <li>Express delivery available in select cities.</li>
                                    <li>Track your order in real-time.</li>
                                </ul>
                            </div>
                            <div className="policy-block">
                                <h3><FaCreditCard /> Return & Refund</h3>
                                <p>If you are not satisfied with your purchase, you can return it within 30 days.</p>
                                <ul>
                                    <li>Items must be unused and with tags.</li>
                                    <li>Refunds are processed to the original payment method within 5-7 days.</li>
                                </ul>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default CustomerService;
