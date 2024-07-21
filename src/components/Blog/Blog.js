// Blog.js
import React, { useState } from 'react';
import BlogPostForm from './BlogPostForm';
import '../../App.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
    // You can also handle storing posts in a database or perform any necessary actions
  };

  return (
    <div className="blog-container p-4">
  <BlogPostForm onAddPost={addPost} />
  
  {/* Render blog posts here */}
  {posts.map((post, index) => (
    <div key={index} className="blog-post bg-white p-4 my-4 shadow-md rounded-md">
      <p className="text-base">{post.content}</p>
      
      {/* Render the image if available */}
      {post.image && (
        <div className="my-4">
          <img
            src={URL.createObjectURL(post.image)}
            alt="Uploaded"
            className="max-w-full max-h-48 object-cover"
          />
        </div>
      )}
      
      <p className="text-gray-500">Date: {post.date}</p>
    </div>
  ))}
</div>

  );
};

export default Blog;
