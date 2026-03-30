import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="blog-footer">
            <div className="footer-glow" />

            <div className="footer-inner">
                {/* Brand */}
                <div className="footer-brand">
                    <h3 className="footer-logo">Blognest</h3>
                    <p className="footer-tagline">
                        Where ideas find their voice. Write boldly, share freely, inspire endlessly.
                    </p>
                    <div className="footer-socials">
                        <a href="#" className="social-btn" aria-label="Twitter">𝕏</a>
                        <a href="#" className="social-btn" aria-label="Instagram">◈</a>
                        <a href="#" className="social-btn" aria-label="LinkedIn">in</a>
                        <a href="#" className="social-btn" aria-label="GitHub">⌥</a>
                    </div>
                </div>

                {/* Links */}
                <div className="footer-col">
                    <h4 className="footer-col-title">Navigate</h4>
                    <ul>
                        <li><a href="/dashboard">Home</a></li>
                        <li><a href="/blog">Explore Blogs</a></li>
                        <li><a href="/write">Write a Blog</a></li>
                        <li><a href="/profile/:id">My Profile</a></li>
                    </ul>
                </div>

                {/* About */}
                <div className="footer-col">
                    <h4 className="footer-col-title">About</h4>
                    <ul>
                        <li><a href="#">Our Story</a></li>
                        <li><a href="#">Community</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Use</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div className="footer-col footer-newsletter">
                    <h4 className="footer-col-title">Stay Updated</h4>
                    <p>Get the best blogs delivered to your inbox weekly.</p>
                    <div className="newsletter-form">
                        <input type="email" placeholder="your@email.com" />
                        <button>→</button>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="footer-bottom">
                <div className="footer-divider" />
                <div className="footer-bottom-content">
                    <p>© 2026 <span>Blognest</span>. All rights reserved.</p>
                    <p>Built with ❤️ for writers everywhere</p>
                </div>
            </div>

        </footer>
    );
};

export default Footer;