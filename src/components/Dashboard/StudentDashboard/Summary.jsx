import React from 'react'
import { FaUser } from 'react-icons/fa'
import { useAuth } from '../../../context/authContext'

const Summary = () => {
    const {user} = useAuth()
  return (
    <div className='p-6'>
    <div className='rounded flex bg-white'>
    <div className="text-4xl flex justify-center items-center text-white px-4">
      <FaUser />
    </div>
    <div className='pl-4 py-1'>
      <p className='text-lg font-semibold'>Welcome Back</p>
      <p className='text-xl font-bold'>{user.name}</p>

    </div>
  </div>
  </div>
  )
}

export default Summary
