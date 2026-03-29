import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import '../Components/Bloginfocard';

const BlogIntroCard = () => {

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <div className="blog-intro-card gradient-bg" data-aos="fade-up">
            <div className="glass-overlay">
                <h2>Blognest</h2>
                <p>
                    Share your voice with the world. Whether you're a storyteller,
                    a techie, or a curious mind — Blognest gives you the space to write,
                    connect, and grow.
                </p>

                <div className="card-buttons">
                    <a href="/write" className="write-btn" data-aos="zoom-in-left">
                        ✍️ Start Writing
                    </a>
                    <a href="/blog" className="blog-btn" data-aos="zoom-in-left">
                        📚 Explore Blogs
                    </a>
                </div>
            </div>
        </div>
    );
};

export default BlogIntroCard;
