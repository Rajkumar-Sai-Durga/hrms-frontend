import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import profile from "../../assets/profile.jpeg"
import "./professional.css"


const Professional = () => {

  const {employeeId} = useParams();
  
  const [details, setDetails] = useState<any>(null);

  const apiCall = async()=>{
    try {
      let response = await axios.get("http://localhost:8080/api/empManager/get/"+employeeId,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      })
      setDetails(response.data.data)
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(()=>{
    apiCall();
  }, [])

  return (
    <div className="d-flex flex-column align-items-center text-center gap-3">
      <div>
        <img src={profile} alt="" className="profile"/>
      </div>
      <div className="d-flex flex-column gap-3">
        <div>
          <h5 className="text-secondary">Employee Name</h5>
          <h2>{details?.employee.firstName} {details?.employee.lastName}</h2>
        </div>
        <div>
          <h5 className="text-secondary">Department</h5>
          <h2>{details?.department}</h2>
        </div>
        <div className="d-flex gap-5">
          <div>
            <h5 className="text-secondary">Job title</h5>
            <h2>{details?.jobTitle}</h2>
          </div>
          <div>
            <h5  className="text-secondary">Category</h5>
            <h2>{details?.category}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Professional