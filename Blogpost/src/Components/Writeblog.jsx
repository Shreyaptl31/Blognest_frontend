import React, { useEffect, useState } from 'react';
import api from '../api';
import AOS from 'aos';
import { useNavigate, useParams } from 'react-router-dom';
import '../Styles/Writeblog.css';

const WriteBlog = () => {
    const { blogId } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    useEffect(() => {
        if (blogId) {
            const fetchBlog = async () => {
                try {
                    const res = await api.get(`/getsingleBlog/${blogId}`);
                    setTitle(res.data.blog.title);
                    setDescription(res.data.blog.description);
                } catch (error) {
                    console.error("Error fetching blog:", error);
                }
            };
            fetchBlog();
        }
    }, [blogId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (blogId) {
                await api.put(`/updateBlog/${blogId}`, { title, description });
                setMessage('✅ Blog updated successfully!');
            } else {
                await api.post('/blogCreate', { title, description, user: userId });
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
        <div className="write-blog-page">
            <div className="write-blog-card" data-aos="fade-up">
                <h2 className="writeblog-title">
                    {blogId ? '✏️ Update Blog' : '📝 Write a New Blog'}
                </h2>
                <p className="writeblog-subtitle">
                    {blogId
                        ? 'Make changes and republish your post.'
                        : 'Share your ideas with the world. Write boldly.'}
                </p>
                <div className="writeblog-divider" />

                <form onSubmit={handleSubmit}>
                    <div className="field-group">
                        <label className="field-label">Title</label>
                        <input
                            type="text"
                            className="field-input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Give your blog a compelling title..."
                            required
                        />
                    </div>

                    <div className="field-group">
                        <label className="field-label">Content</label>
                        <textarea
                            className="field-textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Start writing your story..."
                            required
                        />
                        <div className="field-meta">{description.length} chars</div>
                    </div>

                    <button type="submit" className="btn-publish">
                        {blogId ? '🔄 Update Blog' : '🚀 Publish Blog'}
                    </button>

                    {message && <p className="write-message">{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default WriteBlog;