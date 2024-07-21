// BlogPostForm.js
import React, { useState } from 'react';
import '../../App.css';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
const BlogPostForm = ({ onAddPost }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);


  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new FormData object to handle file uploads
    const newPost = {
      content,
      image,
      date: new Date().toISOString(),
    };

    // Call the onAddPost function passed from the parent component to add the new post
    onAddPost(newPost);

    // Clear form fields after submission
    setContent('');
    setImage(null);
  };

  return (


    <div className="bg-slate-200 ml-80 w-[60vh]  p-2 shadow-md rounded-lg">
      <form onSubmit={handleSubmit}>
        <div class="mb-4">
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            placeholder="Write Something..."
            required
            className="mx-10 my-2 p-2 w-[50vh] h-32 border border-gray-300 rounded-md"
          ></textarea>
        </div>
        <div class="mb-2">
          <label htmlFor="image" className='ml-40' class="cursor-pointer">
            <AddPhotoAlternateRoundedIcon />
          </label>
          <input
            type="file"
            id="image"
            style={{ display: "none" }}
            onChange={handleImageChange}
            accept="image/*" // Allow only image files
            className="p-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="bg-blue-500 ml-20 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Post
          </button>
        </div>

      </form>
    </div>


  );
};

export default BlogPostForm;
