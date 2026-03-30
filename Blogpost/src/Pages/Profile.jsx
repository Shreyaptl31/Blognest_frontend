import React, { useEffect, useState } from "react";
import api from "../api";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import "../Styles/Profile.css";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get(`/singleUser/${userId}`);
                setUser(res.data.user);
            } catch (err) {
                console.error("Error fetching user:", err);
            } finally {
                setLoading(false);
            }
        };
        if (userId) fetchUser();
        else setLoading(false);
    }, [userId]);

    if (loading) return (
        <div style={{ minHeight: '100vh', background: '#0a0a14', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a5b4fc', fontFamily: 'DM Sans, sans-serif' }}>
            Loading...
        </div>
    );
    if (!user) return (
        <div style={{ minHeight: '100vh', background: '#0a0a14', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a5b4fc', fontFamily: 'DM Sans, sans-serif' }}>
            No user found
        </div>
    );

    const initials = user.name
        ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
        : 'U';

    const filteredBlogs = user.blog.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <>
                <Header />

                <div className="profile-page">
                    <div className="profile-container">

                        {/* Hero */}
                        <div className="profile-hero" data-aos="fade-down">
                            {loading ? (
                                <div className="skeleton avatar"></div>
                            ) : (
                                <>
                                    <div className="profile-avatar">{initials}</div>
                                    <div className="profile-hero-text">
                                        <h2>
                                            {user?.name || 'My Profile'}
                                            <span className="blog-count-badge">
                                                {user?.blog?.length || 0} posts
                                            </span>
                                        </h2>
                                        <p>{user?.email}</p>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Search */}
                        <p className="profile-section-label">Your Blogs</p>

                        <div className="profile-search-wrap" data-aos="fade-up">
                            <input
                                type="text"
                                className="profile-search"
                                placeholder="Search your blogs by title..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Blogs */}
                        <div className="blogs-wrapper">
                            {loading ? (
                                // ✅ Skeleton cards
                                Array(4).fill(0).map((_, i) => (
                                    <div className="profile-blog-card skeleton-card" key={i}>
                                        <div className="skeleton title"></div>
                                        <div className="skeleton text"></div>
                                        <div className="skeleton text short"></div>
                                    </div>
                                ))
                            ) : user && filteredBlogs.length > 0 ? (
                                filteredBlogs.map((blog, i) => (
                                    <div
                                        key={blog._id}
                                        className="profile-blog-card"
                                        data-aos="fade-up"
                                        data-aos-delay={i * 60}
                                    >
                                        <h3>{blog.title}</h3>
                                        <p className="profile-blog-description">{blog.description}</p>

                                        <div className="card-actions">
                                            <a href={`/blogdetails/${blog._id}`} className="btn-read">
                                                Read More →
                                            </a>

                                            <button
                                                className="btn-update"
                                                onClick={() => navigate(`/writeblog/${blog._id}`)}
                                            >
                                                ✏️ Update
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="no-blogs">
                                    No blogs found matching "{searchTerm}" 🔍
                                </p>
                            )}
                        </div>

                    </div>
                </div>

                <Footer />
            </>
        </>
    );
};

export default Profile;