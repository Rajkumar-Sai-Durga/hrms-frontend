
import { NavLink, Outlet } from "react-router-dom";
import Logo from "../../assets/WhatsApp Image 2025-12-14 at 17.21.26_8738a792 1.png"
import "./dashboard.css"

const Dashboard = () => {
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
              <img
                src={Logo}
                alt="logo"
              />
            </div>
            

            {/* Profile */}
            <div className="text-center mb-4 d-flex justify-content-around">
              <img
                src="https://i.pravatar.cc/80"
                className="rounded-circle mb-2"
                width="70"
                alt="profile"
              />
              <div className="d-flex flex-column align-items-start justify-content-center">
                <h6 className="mb-0">KRIS Admin</h6>
                <small className="text-muted">Admin</small>
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
                  <button className="btn btn-danger w-100 text-white">
                    Logout
                  </button>
                </li>
              </ul>

            </div>

          </div>
        </nav>

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
            <h5 className="ms-3 mb-0">Dashboard</h5>
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

