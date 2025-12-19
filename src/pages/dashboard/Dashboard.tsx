
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Logo from "../../assets/WhatsApp Image 2025-12-14 at 17.21.26_8738a792 1.png"
import profile from "../../assets/profile.jpeg"
import "./dashboard.css"
import { useState } from "react";
import Confirmation from "../../components/confirmation-model/Confirmation";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate()
  const userStr = localStorage.getItem("userInfo");
  const user = userStr ? JSON.parse(userStr) : null;
  const name = user?.firstName;
  const role = user?.role;

  const handleDelete = () => {
    localStorage.clear();
    navigate("/")
    setShowModal(false);
  };

  return (
    <div className="container-fluid">
      <div className="row">

        {/* Sidebar */}
        <nav
          id="sidebar"
          className="col-sm-4 col-lg-2 d-md-block bg-color sidebar collapse min-vh-100"
        >
          <div className="position-sticky text-white h-100">
            
            {/* logo */}
            <div className="mb-4 logo d-flex justify-content-start align-items-center">
              <Link to="/dashboard">
                <img
                  src={Logo}
                  alt="logo"
                />
              </Link>
              
            </div>
            

            {/* Profile */}
            <div className="text-center mb-4 d-flex gap-3">
              <img
                src={profile}
                className="rounded-circle mb-2"
                width="70"
                alt="profile"
              />
              <div className="d-flex flex-column align-items-start justify-content-center">
                <h3 className="mb-0">{name}</h3>
                <p className="text-secondary">{role}</p>
              </div>
            </div>

            {/* Menu */}
            <div className="d-flex flex-column justify-content-between height">
              <ul className="nav nav-pills flex-column gap-2">

                <li className="nav-item">
                  <NavLink className="nav-link" to="home">
                    Dashboard
                  </NavLink>
                </li>

                <div>
                  <p className="mb-1">Organization</p>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="employees">
                      <i className="bi bi-people-fill icons"></i>
                      Employee Management
                    </NavLink>
                  </li>
                </div>

                <li className="nav-item">
                  <NavLink className="nav-link" to="leaves">
                    <i className="bi bi-book-half icons"></i>
                    Leave Management
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="issues">
                    <i className="bi bi-info-circle-fill icons"></i>
                    Issues
                  </NavLink>
                </li>
              </ul>
              <ul className="nav nav-pills flex-column gap-2">
                <li className="nav-item mt-2">
                  <button className="btn btn-danger w-100 text-white" onClick={() => setShowModal(true)}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>

          </div>
        </nav>
        <Confirmation
          show={showModal}
          title="Logout"
          message="Are you sure you want to logout?"
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />

        {/* Main Content */}
        <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">

          {/* Top Navbar */}
          <nav className="navbar navbar-light bg-light sticky-top">
            <button
              className="btn btn-outline-dark d-md-none"
              data-bs-toggle="collapse"
              data-bs-target="#sidebar"
            >
              ☰
            </button>
          </nav>

          <div className="pt-4">
            <Outlet />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

