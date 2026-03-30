import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './Auth/Register';
import Login from './Auth/Login';
import Dashboard from './Pages/Dashboard';
import Blog from './Pages/Blog';
import Write from './Pages/Write';
import WriteBlog from './Components/Writeblog';
import Profile from './Pages/Profile';
import Blogdetails from './Pages/Blogdetails';

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Default route */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/write" element={<Write />} />
        <Route path="/writeblog/:blogId" element={<WriteBlog />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/blogdetails/:id" element={<Blogdetails />} />
      </Routes>
    </Router>
  );
}

export default App;