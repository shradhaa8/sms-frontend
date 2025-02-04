import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import "tailwindcss";
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Details from './components/Dashboard/Details';
import StudentList from './components/Dashboard/Student/StudentList';
import AddStudent from './components/Dashboard/Student/AddStudent';
import UpdateStudent from './components/Dashboard/Student/UpdateStudent';
import ViewStudent from './components/Dashboard/Student/ViewStudent'
import StudentDashboard from './pages/StudentDashboard';
import Summary from './components/Dashboard/StudentDashboard/Summary';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBasedRoutes from './utils/RoleBasedRoutes';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element = {<Navigate to ="/admin-dashboard" />}></Route>
      <Route path='/login' element = {<Login/>}></Route>


      <Route path="/student-dashboard" element={
  <PrivateRoutes>
    <RoleBasedRoutes requiredRole={["admin", "student"]}>
      <StudentDashboard />
    </RoleBasedRoutes>
  </PrivateRoutes>
}>
  <Route index element={<Summary />} />
  <Route path="profile/:id" element={<ViewStudent />} />
</Route>



      <Route path='/admin-dashboard' element = {
       <PrivateRoutes>
        <RoleBasedRoutes requiredRole={["admin"]}>
       <AdminDashboard/>
       </RoleBasedRoutes>
       </PrivateRoutes>
        
        }>
      <Route index element={<Details/>}></Route>
      <Route path='/admin-dashboard/courses' element={<Details/>}></Route>
      <Route path='/admin-dashboard/students' element={<StudentList/>}></Route>
      <Route path='/admin-dashboard/addstudent' element={<AddStudent />}></Route>
      <Route path='/admin-dashboard/students/update/:id' element={<UpdateStudent />}></Route>
      <Route path='/admin-dashboard/students/:id' element={<ViewStudent/>}></Route>
      </Route>
      </Routes></BrowserRouter>
  )
}

export default App
