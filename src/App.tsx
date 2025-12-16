import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './pages/login_page/Login';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
      <Login></Login>
      <ToastContainer></ToastContainer>
    </>
  )
}

export default App
