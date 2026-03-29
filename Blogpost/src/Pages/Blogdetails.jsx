import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
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
        AOS.init({ duration: 1000, once: true });
    }, []);

    const fetchBlog = async () => {
        try {
            const res = await axios.get(
                `http://localhost:3000/getSingleBlog/${id}`
            );
            setBlog(res.data.blog);
        } catch (err) {
            console.error("Error fetching blog:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlog();
    }, [id]);

    // 🔥 DELETE BLOG (Owner only)
    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this blog?"
        );
        if (!confirmDelete) return;

        try {
            await axios.delete(
                `http://localhost:3000/deleteBlog/${id}`
            );
            alert("🗑 Blog deleted successfully!");
            navigate("/profile"); // ✅ fixed redirect
        } catch (error) {
            console.error("Error deleting blog:", error);
            alert("❌ Failed to delete blog");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!blog) return <p>Blog not found</p>;

    // 🔐 OWNER CHECK
    const isOwner =
        blog.user?._id === loggedInUserId;

    return (
        <>
            <Header />

            <div className="blog-details-wrapper">
                <div className="blog-details-card" data-aos="zoom-in">
                    <h1 className="blog-title">{blog.title}</h1>

                    <p className="blog-info">
                        By{" "}
                        <strong>
                            {blog.user?.username ||
                                blog.user?.name ||
                                blog.user?.email ||
                                "Unknown"}
                        </strong>{" "}
                        on {new Date(blog.createdAt).toLocaleDateString()}
                    </p>

                    <p className="blog-description">{blog.description}</p>

                    {/* 🔥 OWNER-ONLY ACTIONS */}
                    {isOwner && (
                        <div className="d-flex gap-2 mt-4">
                            <button
                                className="btn btn-warning"
                                onClick={() =>
                                    navigate(`/writeblog/${blog._id}`)
                                }
                            >
                                Update ✏️
                            </button>

                            <button
                                className="btn btn-danger"
                                onClick={handleDelete}
                            >
                                Delete 🗑
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default BlogDetails;
