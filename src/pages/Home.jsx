import React, { useState, useEffect } from 'react';
import Blog from '../components/Blog/Blog.js'
import Sidebar from '../components/Bar/Sidebar';
// import RightSide from '../components/Bar/RightSide'
import { auth, db } from '../config/firebase.js'
import Navbar from '../components/Bar/NavBar';

function Home() {





  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Blog className="mx-auto" />
        {/* <RightSide /> */}
      </div>

    </>


  );
};


export default Home;
