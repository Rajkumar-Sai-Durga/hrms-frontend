import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./App.css"
import Login from './pages/login_page/Login';
import { ToastContainer } from 'react-toastify';
import { Routes, Route, Navigate } from 'react-router-dom';
import Registration from './pages/registration/Registration';
import ForgetPassword from './pages/forget_password/ForgetPassword';
import ResetPassword from './pages/forget_password/ResetPassword';
import Dashboard from './pages/dashboard/Dashboard';
import EmployeeManagement from './pages/employeeManage/EmployeeManagement';
import Home from './pages/Home/Home';
import Leaves from './pages/leaves/Leaves';
import { Issues } from './pages/Issues/Issues';
import Profiles from './pages/profile/Profiles';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login></Login>}/>
        <Route path='/registration' element={<Registration></Registration>}/>
        <Route path='/forget-password' element={<ForgetPassword></ForgetPassword>}/>
        <Route path='/reset-password/:email' element={<ResetPassword></ResetPassword>}/>

        <Route path='/dashboard' element={<Dashboard></Dashboard>}>
          <Route index element={<Navigate to="home" />} />
          <Route path='home' element={<Home></Home>}/>
          <Route path='employees' element={<EmployeeManagement></EmployeeManagement>}/>
          <Route path='leaves' element={<Leaves></Leaves>}/>
          <Route path='issues' element={<Issues></Issues>}/>

        </Route>

          <Route path='/profile/:employeeId' element={<Profiles></Profiles>}>
            <Route index element={<Navigate to="home"/>}/>
            {/* <Route path='home' element={}/> */}
          </Route>

      </Routes>
      <ToastContainer></ToastContainer>
    </>
  )
}

export default App
