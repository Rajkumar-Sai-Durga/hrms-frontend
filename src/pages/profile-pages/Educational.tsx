import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

const Educational = () => {

  const [education, setEducation] = useState([]);
  const {employeeId} = useParams()

  const apiCall = async() =>{
    try {
      let response = await axios.get("http://localhost:8080/api/educational/get/"+employeeId,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      })
      setEducation(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    apiCall()
  })

  return (
    <div>{education.length ? education.map((data: any)=>(<div key={data.id} className="card shadow-sm border-0 mb-3">
      <div className="card-body">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0 fw-bold">
            {data.degree} ({data.degreeType})
          </h5>
          <span className="badge bg-success">
            CGPA: {data.cgpa}
          </span>
        </div>

        {/* Institute */}
        <p className="mb-2 text-muted">
          {data.institute}
        </p>

        {/* Specialization */}
        <p className="mb-2">
          <strong>Specialization:</strong> {data.specialization}
        </p>

        {/* Duration */}
        <p className="mb-0 text-muted">
          {new Date(data.started).toLocaleDateString("en-IN", {
              month: "short",
              year: "numeric",
            })}{" "}
            -{" "}
            {new Date(data.ended).toLocaleDateString("en-IN", {
              month: "short",
              year: "numeric",
            })}
        </p>

      </div>
    </div>)) 
    : <div>
      <h1 className="text-secondary text-opacity-50 text-center">No Educational Details Available</h1>
    </div>
    }</div>
    
  )
}

export default Educational