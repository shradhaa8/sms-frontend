import React, { useEffect, useState } from 'react'
import Card from './Card'
import { FaBook, FaUser } from 'react-icons/fa'
import axios from 'axios'

const Details = () => {

  const[detail, setDetail] = useState(null)

  useEffect(()=>{
    const fetchDetail = async () =>{
      try {
        const detail = await axios.get('http://localhost:5000/api/dashboard/detail',{
          headers :{
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        setDetail(detail.data)
      }catch (error) {
        if(error.response){
          alert(error.response.data.error)
        }
        console.log(error.message);
        
      }
    }
    fetchDetail()
  }, [])

  if(!detail){
    return <div>Loading.....</div>
  }

  return (
    <div className='p-6'>
        <h3 className='text 3-xl font-bold'>Student Overview</h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'> 
        <Card icon={<FaUser/>} text={"Total Students"} number={detail.totalStudents} color="bg-cyan-500"/>
        <Card icon={<FaBook/>} text={"Total Courses"} number={8}  color="bg-orange-500"/>
        </div>
      
    </div>
  )
}

export default Details
