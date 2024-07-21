import React from 'react'
import Navbar from '../components/Bar/NavBar'
import Sidebar from '../components/Bar/Sidebar'

import UserDetails from "../components/UserDetails";
function ProfilePage() {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="mx-auto h-[100vh] w-[100%] mt-2">
          <UserDetails  />

        </div>
      </div>
    </>
  )
}

export default ProfilePage
