import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/WhatsApp Image 2025-12-14 at 17.21.26_8738a792 1.png"
import { useState } from "react";
import Confirmation from "../../components/confirmation-model/Confirmation";


const Navbar = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate()
    const userStr = localStorage.getItem("userInfo");
    const user = userStr ? JSON.parse(userStr) : null;
    const profileLink = `profile/${user?.employeeId || ""}`;

    const logOut = ()=>{
      localStorage.clear();
      navigate("/")
    }
  return (
    <div>

      <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4">
        <Link to="/employee-dashboard" className="navbar-brand fw-bold text-primary">
          <img
              src={Logo}
              alt="logo"
              width={100}
          />
        </Link>
  
        <ul className="navbar-nav ms-4">
          <li className="nav-item">
            <NavLink to="home" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="leaves" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Leaves
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="issues" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Issues
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={profileLink} className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Profile
            </NavLink>
          </li>
        </ul>
  
        <div className="ms-auto d-flex gap-3">
          <button className="btn btn-danger" onClick={()=>setShow(true)}>Logout</button>
        </div>
      </nav>
      <Confirmation 
        title="Logout"
        show={show} 
        message="Are you sure you want to logout?"
        onConfirm={logOut}
        onCancel={()=>setShow(false)}
      >

      </Confirmation>
    </div>
  );
};

export default Navbar;
