import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaPhone, FaSave } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
    const { user, updateProfile } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        const result = await updateProfile(formData);

        setLoading(false);
        if (result.success) {
            setMessage({ type: 'success', text: result.message });
        } else {
            setMessage({ type: 'error', text: result.message });
        }

        // Clear message after 3 seconds
        setTimeout(() => {
            setMessage({ type: '', text: '' });
        }, 3000);
    };

    if (!user) {
        return <div className="profile-container container">Loading...</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <div className="profile-avatar">
                        <div className="avatar-placeholder">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        {/* <button className="avatar-edit-btn"><FaCamera /></button> */}
                    </div>
                    <h2>My Profile</h2>
                    <p className="profile-role">{user.role === 'admin' ? 'Administrator' : 'Shopper'}</p>
                </div>

                {message.text && (
                    <div className={`message-alert ${message.type}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="profile-form">
                    <div className="form-group">
                        <label>
                            <FaUser className="input-icon" />
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            <FaEnvelope className="input-icon" />
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            <FaPhone className="input-icon" />
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                        />
                    </div>

                    <button type="submit" className="save-btn" disabled={loading}>
                        {loading ? 'Saving...' : <><FaSave /> Save Changes</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
