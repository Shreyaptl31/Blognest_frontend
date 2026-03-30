import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../Styles/Bloginfocard.css";

const TYPING_WORDS = ["Stories.", "Ideas.", "Knowledge.", "Inspiration.", "Blogs."];

const BlogIntroCard = () => {
    const [wordIndex, setWordIndex] = useState(0);
    const [displayed, setDisplayed] = useState("");
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    // Typing effect
    useEffect(() => {
        const word = TYPING_WORDS[wordIndex];
        let timeout;

        if (!deleting && displayed.length < word.length) {
            timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
        } else if (!deleting && displayed.length === word.length) {
            timeout = setTimeout(() => setDeleting(true), 1400);
        } else if (deleting && displayed.length > 0) {
            timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length - 1)), 45);
        } else if (deleting && displayed.length === 0) {
            setDeleting(false);
            setWordIndex((i) => (i + 1) % TYPING_WORDS.length);
        }

        return () => clearTimeout(timeout);
    }, [displayed, deleting, wordIndex]);

    return (
        <div className="intro-section">
            {/* Floating orbs */}
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />

            <div className="intro-content" data-aos="fade-up">
                <div className="intro-badge">✦ Welcome to Blognest</div>
                <h1 className="intro-heading">
                    Share Your <br />
                    <span className="typing-word">{displayed}</span>
                    <span className="typing-cursor">|</span>
                </h1>
                <p className="intro-desc">
                    Whether you're a storyteller, a techie, or a curious mind —
                    Blognest gives you the space to write, connect, and grow with
                    thousands of readers worldwide.
                </p>
                <div className="intro-buttons">
                    <a href="/write" className="btn-primary-grad" data-aos="zoom-in" data-aos-delay="100">
                        ✍️ Start Writing
                    </a>
                    <a href="/blog" className="btn-outline-grad" data-aos="zoom-in" data-aos-delay="200">
                        📚 Explore Blogs
                    </a>
                </div>

                {/* Stats row */}
                <div className="intro-stats" data-aos="fade-up" data-aos-delay="300">
                    <div className="stat-item">
                        <span className="stat-num">500+</span>
                        <span className="stat-label">Writers</span>
                    </div>
                    <div className="stat-divider" />
                    <div className="stat-item">
                        <span className="stat-num">1.0K</span>
                        <span className="stat-label">Blogs</span>
                    </div>
                    <div className="stat-divider" />
                    <div className="stat-item">
                        <span className="stat-num">5K+</span>
                        <span className="stat-label">Readers</span>
                    </div>
                </div>
            </div>

            {/* Decorative card */}
            <div className="intro-deco" data-aos="fade-left" data-aos-delay="200">
                <div className="deco-card">
                    <div className="deco-line" />
                    <p className="deco-quote">"Writing is the painting of the voice."</p>
                    <span className="deco-author">— Voltaire</span>
                    <div className="deco-tags">
                        <span>#Writing</span>
                        <span>#Stories</span>
                        <span>#Blognest</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogIntroCard;