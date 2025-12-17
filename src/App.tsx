import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './pages/login_page/Login';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import Registration from './pages/registration/Registration';
import ForgetPassword from './pages/forget_password/ForgetPassword';
import ResetPassword from './pages/forget_password/ResetPassword';

function App() {

  return (
    <>
      
      <Routes>
        <Route path='/' element={<Login></Login>}/>
        <Route path='/registration' element={<Registration></Registration>}/>
        <Route path='/forget-password' element={<ForgetPassword></ForgetPassword>}/>
        <Route path='/reset-password/:email' element={<ResetPassword></ResetPassword>}/>
        
      </Routes>
      <ToastContainer></ToastContainer>
    </>
  )
}

export default App
