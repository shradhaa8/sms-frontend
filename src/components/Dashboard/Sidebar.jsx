import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaBook, FaCalendarCheck, FaCogs, FaTachometerAlt, FaUser } from 'react-icons/fa'

const Sidebar = () => {
  return (
    <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
      <div className='bg-cyan-500 h-12 items-center justify-center'>
        <h3 className='text-2xl text-center font-seri p-2'>Student MS</h3>
      </div>
      <div>
        <NavLink to="/admin-dashboard" className={({isActive}) => `${isActive ?"bg-cyan-500":""} flex items-center space-x-4 block py-2.5 px-4 rounded`} end>
            <FaTachometerAlt />
            <span>Dashboard</span>
        </NavLink>
        <NavLink to="/admin-dashboard/students" className={({isActive}) => `${isActive ?"bg-cyan-500":""} flex items-center space-x-4 block py-2.5 px-4 rounded`}>
            <FaUser />
            <span>Student</span>
        </NavLink>
        <NavLink to="/admin-dashboard/courses" className="flex items-center space-x-4 block py-2.5 px-4 rounded">
            <FaBook />
            <span>Courses</span>
        </NavLink>
        <NavLink to="/admin-dashboard/attendance" className="flex items-center space-x-4 block py-2.5 px-4 rounded">
            <FaCalendarCheck />
            <span>Attendance</span>
        </NavLink>
        <NavLink to="/admin-dashboard" className="flex items-center space-x-4 block py-2.5 px-4 rounded">
            <FaCogs />
            <span>Settings</span>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
