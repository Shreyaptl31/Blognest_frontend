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
        },
        {
            title: "Discover Content",
            description: "Explore trending blogs, niche topics, and connect with writers who inspire you.",
            icon: "🔍",
        },
        {
            title: "Personal Dashboard",
            description: "Track your blog stats, manage drafts, and customize your writing space.",
            icon: "📊",
        },
        {
            title: "Community & Feedback",
            description: "Engage with readers, receive comments, and grow your writing journey together.",
            icon: "💬",
        },
    ];

    return (
        <div className="blog-info-section" data-aos={"fade-up"}>
            {cards.map((card, index) => (
                <div className="blog-info-card" key={index} data-aos={"fade-up"}>
                    <div className="card-icon">{card.icon}</div>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                </div>
            ))}
        </div>
    );
};


export default BlogInfoCards;