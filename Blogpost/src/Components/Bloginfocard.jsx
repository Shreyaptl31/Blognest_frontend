import React, { useEffect } from 'react';
import '../Styles/Bloginfocard.css';
import AOS from 'aos';

const BlogInfoCards = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const cards = [
        {
            title: "Write & Share",
            description: "Express your thoughts, stories, and expertise through beautifully crafted blog posts.",
            icon: "📝",
            color: "card-purple",
            delay: 0,
        },
        {
            title: "Discover Content",
            description: "Explore trending blogs, niche topics, and connect with writers who inspire you.",
            icon: "🔍",
            color: "card-blue",
            delay: 100,
        },
        {
            title: "Personal Dashboard",
            description: "Track your blog stats, manage drafts, and customize your writing space.",
            icon: "📊",
            color: "card-teal",
            delay: 200,
        },
        {
            title: "Community & Feedback",
            description: "Engage with readers, receive comments, and grow your writing journey together.",
            icon: "💬",
            color: "card-pink",
            delay: 300,
        },
    ];

    return (
        <div className="features-section">
            <div className="features-header" data-aos="fade-up">
                <span className="features-badge">✦ Why Blognest</span>
                <h2>Everything you need to <span>write & grow</span></h2>
            </div>
            <div className="features-grid">
                {cards.map((card, index) => (
                    <div
                        className={`feature-card ${card.color}`}
                        key={index}
                        data-aos="fade-up"
                        data-aos-delay={card.delay}
                    >
                        <div className="feature-icon-wrap">
                            <span className="feature-icon">{card.icon}</span>
                        </div>
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                        <div className="feature-arrow">→</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogInfoCards;