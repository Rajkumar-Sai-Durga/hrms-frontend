import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState<any>()
  console.log(localStorage.getItem("accessToken"))
  const navigate = useNavigate();

  const apiCall = async()=>{
    try {
      let response = await axios.get("http://localhost:8080/api/empManager/get/all",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      })
      setEmployees(response.data.data)
    } catch (error) {
      console.log(error);
      toast.error("Server not responding")
    }
  }

  useEffect(()=>{
    apiCall();
  },[])
  

  const employeeInfo = (employeeId: string)=>{
    navigate("/profile/"+employeeId)
  }

  return (
    <div>
      <h1>Employee Management</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">NAME</th>
            <th scope="col">DEPARTMENT</th>
            <th scope="col">JOB TITLE</th>
            <th scope="col">CATEGORY</th>
            <th scope="col">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {employees?.map((employee: any)=>(
            <tr key={employee.employee.employeeId}>
              <td>{employee.employee.employeeId}</td>
              <td>{employee.employee.firstName}</td>
              <td>{employee.department}</td>
              <td>{employee.jobTitle}</td>
              <td>{employee.category}</td>
              <td onClick={()=>employeeInfo(employee.employee.employeeId)}><i className="bi bi-eye-fill"></i></td>
          </tr>
          ))}
          
        </tbody>
      </table>
    </div>
  )
}

export default EmployeeManagement