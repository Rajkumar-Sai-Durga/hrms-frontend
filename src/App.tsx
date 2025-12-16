import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './pages/login_page/Login';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import Registration from './pages/registration/Registration';

function App() {

  return (
    <>
      
      <Routes>
        <Route path='/' element={<Login></Login>}/>
        <Route path='/registration' element={<Registration></Registration>}/>
      </Routes>
      <ToastContainer></ToastContainer>
    </>
  )
}

export default App
