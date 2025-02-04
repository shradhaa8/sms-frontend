import React from 'react'
import Sidebar from '../components/Dashboard/Sidebar'
import Navbar from '../components/Dashboard/Navbar'
import Details from '../components/Dashboard/Details'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'

const AdminDashboard = () => {
  const {user} = useAuth()
  const navigate = useNavigate()
  return (
    <div className='flex'>
      <Sidebar/>
      <div className='flex-1 ml-64 bg-gray-100 h-screen'>
      <Navbar/>
      <Outlet/>
      </div>
    </div>
  )
}

export default AdminDashboard
