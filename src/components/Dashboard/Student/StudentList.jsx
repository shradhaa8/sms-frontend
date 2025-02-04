import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns, StudentButtons } from '../../../utils/StudentTable';
import axios from 'axios';

const StudentList = () => {
  const [students, setStudents] = useState([])
  const [stdLoading, setStdLoading] = useState(false)
  const [filteredStudent, setFilteredStudent] = useState([])

  const onStudentDelete = async (id) =>{
    const data = await students.filter(std => std._id !== id)
    setStudents(data)
  }

useEffect(()=> {
  const fetchStudents =async ()=>{
    setStdLoading(true)
    try{
      const response = await axios.get('http://localhost:5000/api/student', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,

        }
      })
      if(response.data.success){
        let id=1;
        const data = await response.data.students.map((std) =>(
          {
            _id: std._id,
            id: id++,
            s_name: std.s_name || '',
            email: std.email,
            age: std.age,
            course_enrolled: std.course_enrolled,
            profileImage: <img width={30} className= 'w-10 h-10 object-cover rounded-full' src={`http://localhost:5000/${std.userId.profileImage}`} />,
            action: <StudentButtons _id={std._id} onStudentDelete={onStudentDelete}/>

          }
        ))
        setStudents(data)
        setFilteredStudent(data)
      }
    }
    catch(error){
      if(error.response && !error.response.data.success){
        alert(error.response.data.error)
      }

    }finally{
      setStdLoading(false)
    }
  }
  fetchStudents()
}, [])

const handleFilter = (e) => {
  const records = students.filter((std) => (
    (std.s_name && typeof std.s_name === 'string' && std.s_name.toLowerCase().includes(e.target.value.toLowerCase())) ||
    (std.course_enrolled && typeof std.course_enrolled === 'string' && std.course_enrolled.toLowerCase().includes(e.target.value.toLowerCase()))
  ));
  setFilteredStudent(records);
};

  return (
    <>{stdLoading ? <div>Loading....</div> : 
    <div className='p-6'>
        <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Students</h3>
    </div>
    <div className='flex justify-between items-center'>
        <input
            type='text' placeholder='Search By Name or Course' onChange={handleFilter} className='w-60 px-4 py-0.5 border rounded-md' 
        />
        <Link to="/admin-dashboard/addstudent" className="px-4 py-1 bg-cyan-500 rounded text-white">
        Add Student
        </Link>
        
    </div>
    <div className='mt-5'>
      <DataTable 
      columns={columns} data={filteredStudent} pagination/>
    </div>
    </div>
    }</>
  )
}

export default StudentList
