import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaClipboard, FaCogs, FaTachometerAlt, FaUser } from 'react-icons/fa'
import { useAuth } from '../../../context/authContext'

const StudentSidebar = () => {
  const {user} =useAuth()
  return (
    <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
      <div className='bg-cyan-500 h-12 items-center justify-center'>
        <h3 className='text-2xl text-center font-seri p-2'>Student MS</h3>
      </div>
      <div>
        <NavLink to="/student-dashboard" className={({isActive}) => `${isActive ?"bg-cyan-500":""} flex items-center space-x-4 block py-2.5 px-4 rounded`} end>
            <FaTachometerAlt />
            <span>Dashboard</span>
        </NavLink>
        <NavLink to={`/student-dashboard/profile/${user._id}`} className={({isActive}) => `${isActive ?"bg-cyan-500":""} flex items-center space-x-4 block py-2.5 px-4 rounded`}>
            <FaUser />
            <span>My Profile</span>
        </NavLink>
        <NavLink to="/student-dashboard/notices" className={({isActive}) => `${isActive ?"bg-cyan-500":""} flex items-center space-x-4 block py-2.5 px-4 rounded`}>
            <FaClipboard />
            <span>Notices</span>
        </NavLink>
        <NavLink to="/student-dashboard/settings" className={({isActive}) => `${isActive ?"bg-cyan-500":""} flex items-center space-x-4 block py-2.5 px-4 rounded`}>
            <FaCogs />
            <span>Settings</span>
        </NavLink>
      </div>
    </div>
  )
}

export default StudentSidebar
