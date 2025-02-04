import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/student/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          setStudent(response.data.student);
        } else {
          setError('Student not found');
        }
      } catch (error) {
        if (error.response) {
          setError(error.response.data.error || 'An error occurred while fetching the student data');
        } else {
          setError('Network error');
        }
      }
    };
    fetchStudent();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>{student ? (
      <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-8 text-center">Student Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            
            {student.userId.profileImage ? (
              <img
                src={`http://localhost:5000/${student.userId.profileImage}`}
                alt="student_image"
                className="w-full h-auto rounded-md"
              />
            ) : (
              <div>No image available</div>
            )}
          </div>
          <div>
            <div className="flex space-x-3 mb-5">
              <p className="text-lg font-bold">Full Name:</p>
              <p className="font-medium">{student.s_name}</p>
            </div>
            <div className="flex space-x-3 mb-5">
              <p className="text-lg font-bold">Email:</p>
              <p className="font-medium">{student.email}</p>
            </div>
            <div className="flex space-x-3 mb-5">
              <p className="text-lg font-bold">Age:</p>
              <p className="font-medium">{student.age}</p>
            </div>
            <div className="flex space-x-3 mb-5">
              <p className="text-lg font-bold">Course Enrolled:</p>
              <p className="font-medium">{student.course_enrolled}</p>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div>Loading...</div>
    )}
    </>
  );
};

export default ViewStudent;
