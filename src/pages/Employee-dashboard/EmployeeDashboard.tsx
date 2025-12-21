import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"

const EmployeeDashboard = () => {
  return (
    <div className="light-bg">
      <Navbar />
      <Outlet />

    </div>
  )
}

export default EmployeeDashboard