import { NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/WhatsApp Image 2025-12-14 at 17.21.26_8738a792 1.png"

const ProfileDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="d-flex justify-content-between px-3 py-2">
            <div className="d-flex align-items-center">
                <img src={logo} alt="logo" />
                <h2 className="ms-3 mb-0 color fw-2">Profile</h2>
            </div>
        </div>
        {/* Sidebar */}
        <nav
          id="sidebar1"
          className="col-sm-4 col-lg-2 d-md-block bg-dark sidebar collapse min-vh-100 rounded-3"
        >
          <div className="position-sticky text-white h-100 py-4">

            {/* Menu */}
              <ul className="nav nav-pills flex-column gap-2">

                <li className="nav-item">
                    <NavLink className="nav-link" to="pro">
                        Professional Details
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink className="nav-link" to="qualification">
                        Qualifications
                    </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="financial">
                    Financial Details
                  </NavLink>
                </li>
              </ul>
          </div>
        </nav>

        {/* Main Content */}
        <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">

          {/* Top Navbar */}
          <nav className="navbar navbar-light bg-light sticky-top">
            <button
              className="btn btn-outline-dark d-md-none"
              data-bs-toggle="collapse"
              data-bs-target="#sidebar1"
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
  )
}

export default ProfileDashboard