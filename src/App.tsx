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
import Professional from './pages/profile-pages/Professional';
import Educational from './pages/profile-pages/Educational';
import BankDetails from './pages/profile-pages/BankDetails';
import ProfileDashboard from './pages/profile-dashboard/ProfileDashboard';
import LeaveConfirmation from './components/confirmation-model/LeaveConfirmation';
import RecallConfirmation from './components/confirmation-model/RecallConfirmation';

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
          <Route path='leaves/confirm' element={<LeaveConfirmation></LeaveConfirmation>}/>
          <Route path='leaves/recall' element={<RecallConfirmation></RecallConfirmation>}/>

          <Route path='profile/:employeeId' element={<ProfileDashboard></ProfileDashboard>}>
            <Route index element={<Navigate to="pro"/>}/>
            <Route path='pro' element={<Professional></Professional>}/>
            <Route path='qualification' element={<Educational></Educational>}/>
            <Route path='financial' element={<BankDetails></BankDetails>}/>
          </Route>
        </Route>


      </Routes>
      <ToastContainer></ToastContainer>
    </>
  )
}

export default App
