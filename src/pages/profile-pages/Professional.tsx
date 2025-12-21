import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import profile from "../../assets/profile.jpeg"
import "./professional.css"

import { createPortal } from "react-dom";
import { toast } from "react-toastify";
const Professional = () => {

  const {employeeId} = useParams();
  
  const [details, setDetails] = useState<any>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [department, setDepartment] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [category, setCategory] = useState("");

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
        {!details && (
          <div className="mt-3">
            <button
              className="btn btn-primary"
              onClick={() => {
                setDepartment("");
                setJobTitle("");
                setCategory("");
                setShowAdd(true);
              }}
            >
              Add Professional Details
            </button>
          </div>
        )}
      </div>
      {showAdd && createPortal(
        <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-modal="true"
          style={{ zIndex: 2000, position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="modal-dialog modal-lg" style={{ maxWidth: 700, zIndex: 100001, position: "relative" }}>
            <div className="modal-content" style={{ position: "relative", zIndex: 100002 }}>
              <div className="modal-header">
                <h5 className="modal-title">Add Professional Details</h5>
                <button className="btn-close" onClick={() => setShowAdd(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    const id = employeeId || "EMP42016";
                    const resp = await axios.post(`http://localhost:8080/api/empManager/create/${id}`, {
                      department, jobTitle, category
                    }, { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }});
                    toast.success(resp.data?.message || "Professional details added");
                    setShowAdd(false);
                    apiCall();
                  } catch (err:any) {
                    toast.error(err?.response?.data?.message || "Request failed");
                  }
                }}>
                  <div className="mb-3">
                    <label className="form-label">Department</label>
                    <input className="form-control" value={department} onChange={e=>setDepartment(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Job Title</label>
                    <input className="form-control" value={jobTitle} onChange={e=>setJobTitle(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <input className="form-control" value={category} onChange={e=>setCategory(e.target.value)} />
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-primary" type="submit">Save</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowAdd(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" style={{ zIndex: 1990, position: "fixed", inset: 0 }}></div>
        </div>, document.body)}
    </div>
  )
}

export default Professional