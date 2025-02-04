import React from 'react'
import StudentSidebar from '../components/Dashboard/StudentDashboard/StudentSidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Dashboard/Navbar.jsx'
const StudentDashboard = () => {
  return (
    <div className='flex'>
      <StudentSidebar/>
      <div className='flex-1 ml-64 bg-gray-100 h-screen'>
      <Navbar/>
      <Outlet/>
      </div>
    </div>
  )
}

export default StudentDashboard
