import axios from "axios";
import profile from "../../assets/profile.jpeg"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfileCard = () => {
  const [employee, setEmployee] = useState<any>();
  const navigate = useNavigate();
  
  const userStr = localStorage.getItem("userInfo");
  const user = userStr ? JSON.parse(userStr) : null;
  

  const apiCall = async()=>{
    try {
      let response = await axios.get("http://localhost:8080/api/empManager/get/all",{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      })
      setEmployee(response.data.data.filter((emp: any)=>emp.employee.employeeId == user.employeeId))
      
    } catch (error) {
      toast.error("server not responding.")
    }
  }

  useEffect(()=>{
    apiCall()
  },[])

  return (
    <div className="card profile-card p-4 mb-4 text-white bg-color">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex gap-3 align-items-center">
          <img
            src={profile}
            className="rounded-circle"
            alt="profile"
            width={100}
          />
          <div>
            <h4 className="mb-0">{user.firstName}</h4>
            <small>{employee && employee[0].jobTitle}</small>
          </div>
        </div>
        <button
          className="btn btn-warning"
          onClick={() => navigate(`/employee-dashboard/profile/${user?.employeeId}/pro`)}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
