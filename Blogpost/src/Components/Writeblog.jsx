import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import { useNavigate, useParams } from 'react-router-dom';
import '../Styles/WriteBlog.css';


const WriteBlog = () => {
    const { blogId } = useParams(); // 🔥 detects update mode
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    // 🔥 Fetch blog when updating
    useEffect(() => {
        if (blogId) {
            const fetchBlog = async () => {
                try {
                    const res = await axios.get(
                        `http://localhost:3000/getsingleBlog/${blogId}`
                    );
                    setTitle(res.data.blog.title);
                    setDescription(res.data.blog.description);
                } catch (error) {
                    console.error("Error fetching blog:", error);
                }
            };
            fetchBlog();
        }
    }, [blogId]);

    // 🔥 Create or Update Blog
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (blogId) {
                // UPDATE
                await axios.put(
                    `http://localhost:3000/updateBlog/${blogId}`,
                    { title, description }
                );
                setMessage('✅ Blog updated successfully!');
            } else {
                // CREATE
                await axios.post(
                    'http://localhost:3000/blogCreate',
                    { title, description, user: userId }
                );
                setMessage('🥳 Blog created successfully!');
                setTitle('');
                setDescription('');
            }

            setTimeout(() => navigate('/profile/:id'), 1200);
        } catch (error) {
            console.error("Error submitting blog:", error);
            setMessage('❌ Something went wrong');
        }
    };

    return (
        <>
            <div
                className="container write-blog-page bg-dark mt-5 p-5 mb-5"
                data-aos="zoom-in"
            >
                <h2 className="writeblog-title mb-4">
                    {blogId ? '✏️ Update Blog' : '📝 Write a New Blog'}
                </h2>

                <form onSubmit={handleSubmit} className="blog-form">
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            rows="6"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-neon">
                        {blogId ? 'Update Blog' : 'Publish Blog'}
                    </button>

                    {message && <p className="mt-3">{message}</p>}
                </form>
            </div>
        </>
    );
};

export default WriteBlog;
