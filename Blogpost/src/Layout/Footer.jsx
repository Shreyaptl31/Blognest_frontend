import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="blog-footer">
            <div className="footer-content">
                <h3>Blognest</h3>
                <p>Share your voice, inspire others, and grow your digital presence.</p>
                <div className="footer-links">
                    <a href="/dashboard">Home</a>
                    <a href="/blog">Blog</a>
                    <a href="/write">Write</a>
                    <a href="/profile/:id">My Blog</a>
                </div>
                <p className="footer-credit">© 2025 Blognest. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;