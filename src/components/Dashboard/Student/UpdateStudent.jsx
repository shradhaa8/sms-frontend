import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const UpdateStudent = () => {
    const {id} = useParams()
    const [student, setStudent]= useState({
      name: '',
      email: '',
      age: '',
      course_enrolled: ''
    })
    const [stdLoading, setStdLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(()=> {
        const fetchStudents =async ()=>{
            setStdLoading(true)

          try{
            const response = await axios.get(`http://localhost:5000/api/student/${id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` 
              }
            })
            if(response.data.success){
              const student = response.data.student
              setStudent((prev) =>  ({
                ...prev,
                name: student.s_name,
                email: student.email,
                age: student.age,
                course_enrolled: student.course_enrolled
              }))

            }
            
          }
          catch(error){
            if(error.response && !error.response.data.success){
              alert(error.response.data.error)
            }
          }
          finally{
            setStdLoading(false)
          }
        }
        fetchStudents()
      }, [])

      const handleChange = (e) => {
        const {name, value} = e.target
          setStudent(
            (prevData) =>(
              {
                ...prevData,
                [name] : value
              }
            )
          )
        }
    
      const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
          const response = await axios.put(`http://localhost:5000/api/student/${id}`,
            student,{
              headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              }
            }
          )
          if(response.data.success){
            navigate("/admin-dashboard/students")
          }
        } catch (error) {
          if(error.response && !error.response.data.success){
            alert(error.response.data.error)
          }
        }
      }

  return (
    <>{stdLoading ? <div>Loading....</div> : 
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
    
        <h3 className='text-2xl font-bold mb-6'>
          Update Student
        </h3>
        <form encType="multipart/form-data" onSubmit={handleSubmit}> 
          <div >
          <label className='text-sm font-medium text-gray-700'>Full Name</label>
          <input type='text' id='s_name' name='s_name' onChange={handleChange} value={student.name} className='mt-1 w-full p-2 border border-gray-300 rounded-md' placeholder='Enter your name' required/>
          </div>
          <div>
          <label className='text-sm font-medium text-gray-700'>Email</label>
          <input type='email' name='email' onChange={handleChange} value={student.email} className='mt-1 w-full p-2 border border-gray-300 rounded-md' placeholder='Enter your email' required/>
          </div>
          <div>
          <label className='text-sm font-medium text-gray-700'>Age</label>
          <input type='number' name='age' onChange={handleChange} value={student.age} className='mt-1 w-full p-2 border border-gray-300 rounded-md' placeholder='Enter your age' required/>
          </div>
          <div>
          <label className='text-sm font-medium text-gray-700'>Course Enrolled</label>
          <input type='text' name='course_enrolled' onChange={handleChange} value={student.course_enrolled} className='mt-1 w-full p-2 border border-gray-300 rounded-md' placeholder='Enter course enrolled' required/>
          </div>
          <button type='submit' className='w-full mt-6 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md'>
            Update Student
          </button>

        </form>
      </div>
      }</>
  )
}

export default UpdateStudent
