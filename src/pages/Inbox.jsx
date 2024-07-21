import React from 'react'
import Sidebar from '../components/Bar/Sidebar'
import Navbar from '../components/Bar/NavBar'
import ContainerComponent from '../components/Chat/ContainerComponent'




function Inbox() {
    return (
        <>
            <Navbar />
            <div className='flex'>
                <Sidebar />

                <ContainerComponent />
            </div>


        </>
    )
}

export default Inbox
