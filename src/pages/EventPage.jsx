import React from 'react'
import Sidebar from '../components/Bar/Sidebar'
import Navbar from '../components/Bar/NavBar'
import Event from '../components/Events/Event'
function Events() {
  return (
    <>
    <Navbar />
    <div className="flex">
    <Sidebar />
    <Event />
    </div>
    
    </>
  )
}

export default Events
