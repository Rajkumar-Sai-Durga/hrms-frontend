import axios from "axios"
import "./emLeaves.css"
import { createPortal } from "react-dom";
import { useEffect, useState } from "react"
import LeaveDetailsModal from "../../../components/confirmation-model/LeaveDetailsModel";
import ApplyLeave from "./ApplyLeave";

const EmLeaves = () => {
  const [leaves, setLeaves] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [showApply, setShowApply] = useState(false);
  const [applyType, setApplyType] = useState<string>("SICK");

  const handleClick = (leave: any) => {
    setSelectedLeave(leave);
    setShowModal(true);
  };

  const userStr = localStorage.getItem("userInfo");
  const user = userStr ? JSON.parse(userStr) : null;
  const employeeId = user?.employeeId;

  const apiCall = async()=>{
    
    try {
      let response = await axios.get("http://localhost:8080/api/leaves/"+employeeId,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      })
      setLeaves(response.data.data)
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    apiCall();
  },[])


  function formatToIndianDate(dateString: string): string {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  function getDaysDifference(startStr: string, endStr: string): number {
    const start = new Date(startStr);
    const end = new Date(endStr);

    const diffInMs = end.getTime() - start.getTime();
    const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

    return diffInDays;
  }

  const applyLeave = (type: string) => {
    setApplyType(type);
    setShowApply(true);
  };

  return (
    <div className='container bg-whilte height p-5'>
      <div>
        <h4><i className="bi bi-book-half icons"></i>  Apply Leaves</h4>
        <div className="d-flex justify-content-between py-3">
          <div className="bg-color text-light d-flex gap-3 px-4 py-3 rounded-3">
            <h1 className="bg-light color day rounded-5">7</h1>
            <div>
              <h5>Sick leave</h5>
              <button className="btn btn-warning apply" onClick={()=>applyLeave("SICK")}>Apply</button>
            </div>
          </div>
          <div className="bg-color text-light d-flex gap-3 px-4 py-3 rounded-3">
            <h1 className="bg-light color day rounded-5">15</h1>
            <div>
              <h5>Annual leave</h5>
              <button className="btn btn-warning apply" onClick={()=>applyLeave("Annual")}>Apply</button>
            </div>
          </div>
          <div className="bg-color text-light d-flex gap-3 px-4 py-3 rounded-3">
            <h1 className="bg-light color day rounded-5">1</h1>
            <div>
              <h5>Casual leave</h5>
              <button className="btn btn-warning apply" onClick={()=>applyLeave("Casual")}>Apply</button>
            </div>
          </div>
          <div className="bg-color text-light d-flex gap-3 px-4 py-3 rounded-3">
            <h1 className="bg-light color day rounded-5">10</h1>
            <div>
              <h5>Personal leave</h5>
              <button className="btn btn-warning apply" onClick={()=>applyLeave("Personal")}>Apply</button>
            </div>
          </div>

        </div>
      </div>
      <div className="mt-4">
        <div>
          <h6 className="color">Leaves History</h6>
        </div>
        <table className="table table-hover rounded-3">
          <thead>
            <tr>
              <th scope="col">TYPE</th>
              <th scope="col">DURATION</th>
              <th scope="col">START</th>
              <th scope="col">END</th>
              <th scope="col">REASON</th>
              <th scope="col">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {leaves.length ?leaves.map((leave: any)=>(
              <tr key={leave.id}>
                <td>{leave.leaveType}</td>
                <td>{getDaysDifference(leave.startDate,leave.endDate)}</td>
                <td>{formatToIndianDate(leave.startDate)}</td>
                <td>{formatToIndianDate(leave.endDate)}</td>
                <td>{leave.reason}</td>
                <td><i className="bi bi-eye-fill hover" onClick={()=>handleClick(leave)}></i></td>
              </tr>
            )):
            (<tr className=" text-secondary">
              <td colSpan={6}>NO RECORDS FOUND</td>
            </tr>)}
          </tbody>
        </table>
      </div>
      <LeaveDetailsModal
        show={showModal}
        data={selectedLeave}
        onClose={() => setShowModal(false)}
      />

      {showApply &&
        createPortal(
          <div
            className="modal fade show d-block"
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            style={{
              zIndex: 2000,
              position: "fixed",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
            }}
          >
            <div className="modal-dialog modal-lg" style={{ maxWidth: 900, zIndex: 100001, position: "relative" }}>
              <div className="modal-content" style={{ position: "relative", zIndex: 100002 }}>
                <div className="modal-header">
                  <h5 className="modal-title">Apply Leave</h5>
                  <button className="btn-close" onClick={() => setShowApply(false)} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <ApplyLeave leaveType={applyType} onCancel={() => setShowApply(false)} />
                </div>
              </div>
            </div>
            <div className="modal-backdrop fade show" style={{ zIndex: 1990, position: "fixed", inset: 0 }}></div>
          </div>,
          document.body
        )}
    </div>
  )
}

export default EmLeaves