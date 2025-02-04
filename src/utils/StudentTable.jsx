import { useNavigate } from "react-router-dom"
import axios from "axios"

export const columns = [
    {
        name: "ID",
        selector: (row) => row.id,
        width: "50px"
    },
    {
        name: "Full Name",
        selector: (row) => row.s_name,
        sortable: true,
        width: "180px"
    },
    {
        name: "Email",
        selector: (row) => row.email,
        width: "150px"
    },
    {
        name: "Age",
        selector: (row) => row.age,
        width: "80px"
    },
    {
        name: "Course",
        selector: (row) => row.course_enrolled,
        width: "100px"
    },
    {
        name: "Photo",
        selector: (row) => row.profileImage,
        width: "90px"
    },
    {
        name: "Action",
        selector: (row) => row.action,
        style: {
            textAlign: 'center',
        }
    },

]

export const StudentButtons = ({_id, onStudentDelete}) =>{
    const navigate = useNavigate()
    const handleDelete = async(_id) =>{
        const confirm = window.confirm("Do you want to delete?")
        if(confirm){
        try{
            const response = await axios.delete(`http://localhost:5000/api/student/${_id}`, {
              headers: {
                Authorization : `Bearer ${localStorage.getItem('token')}` 
              }
            })
            if(response.data.success){
                onStudentDelete(_id)

            }
          }
          catch(error){
            if(error.response && !error.response.data.success){
              alert(error.response.data.error)
            }
      
          }
    }
}
    return(
        <div className="flex space-x-3">
            <button className="px-3 py-1 bg-blue-600 text-white"
            onClick={()=> navigate(`/admin-dashboard/students/${_id}`)}>View</button>
            <button className="px-3 py-1 bg-green-600 text-white"
            onClick={()=> navigate(`/admin-dashboard/students/update/${_id}`)}>Update</button>
            <button className="px-3 py-1 bg-red-500 text-white"
            onClick={() => handleDelete(_id)}>Delete</button>
        </div>
    )
}