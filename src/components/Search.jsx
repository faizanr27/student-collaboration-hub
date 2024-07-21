import React, { useState, useEffect, useContext } from 'react';
import { db } from '../config/firebase';
import { collection, query, where, getDoc, setDoc, serverTimestamp, doc, updateDoc, getDocs } from 'firebase/firestore';
import { AuthContext } from "../context/AuthContext";
import {
  Avatar,
  Typography,
} from "@material-tailwind/react";
const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ name: '', profilePic: '' });

  const [users, setUsers] = useState(null);
  const { currentUser } = useContext(AuthContext);
  // const [username, setUsername] = useState("");


  useEffect(() => {
    const searchUsers = async () => {
      if (searchQuery.trim() !== '') {
        try {
          const usersRef = collection(db, 'users');
          const q = query(
            usersRef,
            where("displayName", "==", searchQuery)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setUsers(doc.data());
          });
          const results = [];
          querySnapshot.forEach((doc) => {
            results.push(doc.data());
          });

          // Update users state with search results
          setSearchResults(results);
        } catch (error) {
          console.error('Error searching users:', error);
        }
      } else {
        setSearchResults([]);
      }
    };

    searchUsers();
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddConnection = async (currentUser, users) => {
    // Check if currentUser or users is null
    if (!currentUser || !users) {
      console.error("User information is null");
      return;
    }

    const combinedId =
      currentUser.uid > users.uid
        ? currentUser.uid + users.uid
        : users.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        // Create a chat in the "chats" collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        const currentUserPhotoURL = currentUser.profilepic
          ? currentUser.profilepic
          : 'default_profile_pic_url';
        const usersPhotoURL = users.profilepic
          ? users.profilepic
          : 'default_profile_pic_url';
        // Create user chats for currentUser
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: users.uid,
            displayName: users.displayName,
            photoURL: usersPhotoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        // Update user chats for users
        await updateDoc(doc(db, "userChats", users.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUserPhotoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }

      console.log("Adding connections between", currentUser.displayName, "And", users.displayName);
    } catch (err) {
      console.error(err);
    }

    setUsers(null);
  };


  return (
    <div className="search">
      <div className="searchForm relative">
        <input
          type="search"
          placeholder="Find a user"
          className="block w-60 p-3 pl-1 text-sm border border-gray-600 rounded-lg bg-gray-200 focus:ring-blue-500 focus:border-blue-500"
          onChange={handleSearchChange} // Lower case for case insensitive search
          value={searchQuery}
        />
        <button
          type="button"
          className="text-white absolute right-2.5 bottom-2 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 bg-cyan-700"

        >
          <svg
            className="w-4 h-4 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </button>
      </div>

      {searchResults.length > 0 && (
        <div className="mt-2  absolute top-full z-20">
          {searchResults.map((result) => (
            <li key={result.uid} className="searchResults absolute flex gap-16 items-center justify-between gap-3 py-5">
              <div className="flex items-center space-x-4">
                <Avatar
                  variant="circular"
                  alt={result.displayName}
                  src={result.profilepic || 'default-profile-pic-url'}
                  className="w-10 h-10"
                />
                <div>
                  <Typography variant="h6" color="black">
                    {result.displayName}
                  </Typography>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleAddConnection(currentUser, users)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded"
                >
                  Add
                </button>
                <button
                className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded"
              >
                Profile
              </button>
              </div>
            </li>
          ))}
        </div>
      )}

    </div>
  );
};

export default Search;