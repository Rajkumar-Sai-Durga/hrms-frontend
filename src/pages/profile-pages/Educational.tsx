import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";

const Educational = () => {

  const [education, setEducation] = useState([]);
  const {employeeId} = useParams()
  const [showAddEdu, setShowAddEdu] = useState(false);
  const [degreeType, setDegreeType] = useState("");
  const [degree, setDegree] = useState("");
  const [institute, setInstitute] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [started, setStarted] = useState("");
  const [ended, setEnded] = useState("");
  const [cgpa, setCgpa] = useState("");

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

  const deleteEducation = async (id: number) => {
    if (!window.confirm("Delete this educational record?")) return;
    try {
      const idParam = employeeId || "EMP67965";
      await axios.delete(`http://localhost:8080/api/educational/delete/${id}/details?employeeId=${idParam}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      toast.success("Educational record deleted");
      apiCall();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Delete failed");
    }
  };

  useEffect(()=> {
    apiCall()
  },[])

  return (
    <div>
      {education.length ? education.map((data: any)=>(<div key={data.id} className="card shadow-sm border-0 mb-3">
        <div className="card-body">

          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0 fw-bold">
              {data.degree} ({data.degreeType})
            </h5>
            <span className="badge bg-success">
              CGPA: {data.cgpa}
            </span>
            <button className="btn btn-sm btn-outline-danger ms-3" onClick={() => deleteEducation(data.id)}>
              <i className="bi bi-trash3-fill"></i>
            </button>
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
      </div>}

      <div className="my-3 text-center">
        <button
          className="btn btn-primary"
          onClick={() => {
            setDegreeType("");
            setDegree("");
            setInstitute("");
            setSpecialization("");
            setStarted("");
            setEnded("");
            setCgpa("");
            setShowAddEdu(true);
          }}
        >
          Add Educational Details
        </button>
      </div>

      {showAddEdu && createPortal(
        <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-modal="true"
          style={{ zIndex: 2000, position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
        <div className="modal-dialog modal-lg" style={{ maxWidth: 900, zIndex: 100001, position: "relative" }}>
            <div className="modal-content" style={{ position: "relative", zIndex: 100002 }}>
              <div className="modal-header">
                <h5 className="modal-title">Add Educational Details</h5>
                <button className="btn-close" onClick={()=>setShowAddEdu(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={async(e)=>{e.preventDefault(); try {
                  const payload = { degreeType, degree, institute, specialization, started, ended, cgpa };
                  const id = employeeId || "EMP67965";
                  const resp = await axios.post(`http://localhost:8080/api/educational/${id}`, payload, { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }});
                  toast.success(resp.data?.message || "Educational details added");
                  setShowAddEdu(false);
                  apiCall();
                } catch(err:any){ toast.error(err?.response?.data?.message || "Request failed") }}}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Degree Type</label>
                      <input className="form-control" value={degreeType} onChange={e=>setDegreeType(e.target.value)} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Degree</label>
                      <input className="form-control" value={degree} onChange={e=>setDegree(e.target.value)} />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Institute</label>
                    <input className="form-control" value={institute} onChange={e=>setInstitute(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Specialization</label>
                    <input className="form-control" value={specialization} onChange={e=>setSpecialization(e.target.value)} />
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Started</label>
                      <input className="form-control" type="date" value={started} onChange={e=>setStarted(e.target.value)} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Ended</label>
                      <input className="form-control" type="date" value={ended} onChange={e=>setEnded(e.target.value)} />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">CGPA</label>
                    <input className="form-control" value={cgpa} onChange={e=>setCgpa(e.target.value)} />
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-primary" type="submit">Save</button>
                    <button type="button" className="btn btn-secondary" onClick={()=>setShowAddEdu(false)}>Cancel</button>
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

export default Educational