import React, { useEffect, useState } from 'react';
import api from '../api';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../Styles/Blogcard.css';

const Blogcard = () => {
    const [blogs, setBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true); // ✅ loading state

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    useEffect(() => {
        api.get('/getBlogs')
            .then(res => setBlogs(res.data))
            .catch(err => console.error('Error fetching blogs:', err))
            .finally(() => setLoading(false)); // ✅ stop loading
    }, []);

    const getDisplayName = (user) => {
        if (!user) return 'Guest';
        return user.username || user.name || 'Guest';
    };

    const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // ✅ Skeleton placeholders
    const skeletonCards = Array(6).fill(0);

    return (
        <div className="container-fluid blog-page">
            <div className="row">
                <div className="col-12">
                    <h2 className="mb-4">Latest Blogs</h2>

                    {/* Search */}
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="🔍 Search blogs by title..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Blogs / Skeleton */}
                    <div className="row">
                        {loading ? (
                            // ✅ Skeleton Loader
                            skeletonCards.map((_, index) => (
                                <div className="col-md-6 mb-4" key={index}>
                                    <div className="card blog-card bg-dark h-100">
                                        <div className="card-body">
                                            <div className="skeleton title"></div>
                                            <div className="skeleton text"></div>
                                            <div className="skeleton text short"></div>
                                            <div className="skeleton button"></div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : filteredBlogs.length > 0 ? (
                            // ✅ Actual Blogs
                            filteredBlogs.map((blog) => (
                                <div className="col-md-6 mb-4" key={blog._id}>
                                    <div className="card blog-card bg-dark h-100" data-aos="zoom-in">
                                        <div className="card-body">
                                            <h3 className="card-title">{blog.title}</h3>
                                            <p className="blogcard-desc fs-5">{blog.description}</p>
                                            <p className="text-secondary small">
                                                ✍️ By <strong>{getDisplayName(blog.user)}</strong> on{" "}
                                                {new Date(blog.createdAt).toLocaleDateString()}
                                            </p>
                                            <a href={`/blogdetails/${blog._id}`} className="btn btn-neon">
                                                Read More
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            // ✅ No Blogs Message (after loading only)
                            <p className="text-center text-secondary mt-4">
                                No blogs found 🔍
                            </p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Blogcard;