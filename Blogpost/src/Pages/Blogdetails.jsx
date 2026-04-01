import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import AOS from "aos";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import "../Styles/Blogdetails.css";

const BlogDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    const loggedInUserId = localStorage.getItem("userId");

    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await api.get(`/getSingleBlog/${id}`);
                setBlog(res.data.blog);
            } catch (err) {
                console.error("Error fetching blog:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
        if (!confirmDelete) return;
        try {
            await api.delete(`/deleteBlog/${id}`);
            alert("🗑 Blog deleted successfully!");
            navigate("/profile/:id");
        } catch (error) {
            console.error("Error deleting blog:", error);
            alert("❌ Failed to delete blog");
        }
    };

    if (loading) return (
        <div style={{ minHeight: '100vh', background: '#0a0a14', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a5b4fc', fontFamily: 'DM Sans, sans-serif' }}>
            Loading...
        </div>
    );
    if (!blog) return (
        <div style={{ minHeight: '100vh', background: '#0a0a14', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a5b4fc', fontFamily: 'DM Sans, sans-serif' }}>
            Blog not found
        </div>
    );

    const isOwner = blog.user?._id === loggedInUserId;

    const authorName = blog.user?.username || blog.user?.name || blog.user?.email || "Unknown";
    const authorInitials = authorName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <>
            <Header />
            <div className="blog-details-wrapper">
                <div className="blog-details-container">

                    <button className="btn-back" onClick={() => navigate(-1)}>
                        ← Back
                    </button>

                    <div className="blog-details-card" data-aos="fade-up">
                        {/* Meta */}
                        <div className="blog-meta-row">
                            <span className="blog-author-chip">
                                <span className="blog-author-avatar">{authorInitials}</span>
                                {authorName}
                            </span>
                            <span className="blog-date-chip">· {formattedDate}</span>
                        </div>

                        {/* Title */}
                        <h1 className="blog-title">{blog.title}</h1>

                        <div className="blog-content-divider" />

                        {/* Body */}
                        <p className="blog-description">{blog.description}</p>

                        {/* Owner actions */}
                        {isOwner && (
                            <div className="blog-owner-actions">
                                <button
                                    className="btn-update"
                                    onClick={() => navigate(`/writeblog/${blog._id}`)}
                                >
                                    ✏️ Update
                                </button>
                                <button className="btn-delete" onClick={handleDelete}>
                                    🗑 Delete
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
};

export default BlogDetails;