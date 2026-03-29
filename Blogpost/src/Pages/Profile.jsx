import React, { useEffect, useState } from "react";
import axios from "axios";
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
        AOS.init({ duration: 1000, once: true });
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3000/singleUser/${userId}`
                );
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

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>No user found</p>;

    // 🔍 FILTER BLOGS BY TITLE ONLY
    const filteredBlogs = user.blog.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Header />

            <div className="profile-page">
                <div className="profile-container">
                    <div className="profile-header">
                        <h2 className="m-2">My Profile 😊</h2>
                    </div>

                    {/* 🔍 SEARCH BAR */}
                    <div className="mb-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="🔍 Search your blogs by title..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="blogs-wrapper">
                        {filteredBlogs.length > 0 ? (
                            filteredBlogs.map((blog) => (
                                <div
                                    key={blog._id}
                                    className="blog-card bg-dark"
                                    data-aos="zoom-in"
                                >
                                    <h3 className="profile-title">{blog.title}</h3>
                                    <p className="blog-description fs-5">
                                        {blog.description}
                                    </p>

                                    <div className="d-flex gap-2">
                                        <a
                                            href={`/blogdetails/${blog._id}`}
                                            className="btn btn-neon"
                                        >
                                            Read More
                                        </a>

                                        <button
                                            className="btn btn-warning"
                                            onClick={() =>
                                                navigate(`/writeblog/${blog._id}`)
                                            }
                                        >
                                            Update ✏️
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="no-blogs">
                                No blogs found 🔍
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Profile;
