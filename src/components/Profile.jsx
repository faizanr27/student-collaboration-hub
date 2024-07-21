// src/Profile.js
import React, { useState } from 'react';

const Profile = () => {
  const initialUserData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Hello, I am John Doe. Nice to meet you!',
    linkedin: 'https://www.linkedin.com/in/johndoe/',
    degree: 'Bachelor of Science in Computer Science',
  };

  const [userData, setUserData] = useState({ ...initialUserData });
  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleUpdate = () => {
    setEditMode(false);
    // Perform update logic (you can add Firestore update logic here)
    // For simplicity, we'll just log the updated data to the console
    console.log('Updated Data:', userData);
  };

  const handleCancel = () => {
    setEditMode(false);
    setUserData({ ...initialUserData });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-[80%] mx-[10%]">
      <h1 className="text-2xl font-semibold mb-4">{userData.name}</h1>
      <p className="text-gray-600 mb-2">Email: {userData.email}</p>
      {editMode ? (
        <div>
          <label className="block mb-2">Bio:</label>
          <textarea
            name="bio"
            value={userData.bio}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md mb-3"
          />
          <label className="block mb-2">LinkedIn:</label>
          <input
            type="text"
            name="linkedin"
            value={userData.linkedin}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md mb-3"
          />
          <label className="block mb-2">Degree:</label>
          <input
            type="text"
            name="degree"
            value={userData.degree}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md mb-3"
          />
          <div className="flex space-x-4">
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Update
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-gray-600 mb-2">Bio: {userData.bio}</p>
          <p className="text-blue-500 mb-2">LinkedIn: <a href={userData.linkedin} target="_blank" rel="noopener noreferrer">{userData.linkedin}</a></p>
          <p className="text-gray-600 mb-2">Degree: {userData.degree}</p>
          <button
            onClick={handleEdit}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
