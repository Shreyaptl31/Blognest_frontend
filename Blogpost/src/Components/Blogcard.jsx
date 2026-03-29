import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../Styles/Blogcard.css';

const Blogcard = () => {
    const [blogs, setBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3000/getBlogs')
            .then(res => setBlogs(res.data))
            .catch(err => console.error('Error fetching blogs:', err));
    }, []);

    const getDisplayName = (user) => {
        if (!user) return 'Guest';
        return user.username || user.name || 'Guest';
    };

    const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container-fluid blog-page">
            <div className="row">
                <div className="col-12">
                    <h2 className="mb-4">Latest Blogs</h2>

                    {/* 🔍 Search Bar */}
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

                    <div className="row">
                        {filteredBlogs.map((blog, index) => (
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
                        ))}
                    </div>

                    {filteredBlogs.length === 0 && (
                        <p className="text-center text-secondary mt-4">
                            No blogs found 🔍
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Blogcard;
