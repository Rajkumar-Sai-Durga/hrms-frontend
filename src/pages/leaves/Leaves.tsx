import axios from "axios";
import { useEffect, useState } from "react"
import "./leaves.css"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";

const Leaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [allLeaves, setAllLeaves] =useState([])
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);

  const apiCall = async()=>{
    try {
      let response = await axios.get("http://localhost:8080/api/leaves/all",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      })
      setAllLeaves(response.data.data)
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

  const leaveFilter = (status: string) =>{
    setLeaves(allLeaves.filter((leave: any) => leave.status == status))
  }

  const cancelRecall = async(id: number) => {
    setLoad(true)
    try {
      let obj = {
        status : "APPROVED"
      }
      let response = await axios.put("http://localhost:8080/api/leaves/applied/"+id, obj, {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      })
      console.log(response)
      window.location.reload();
      toast.success(response.data.response)
    } catch (error) {
      toast.error("Request failed")
      console.log(error)
    }
    setLoad(false)
  }

  return (
    <div>
      <h1><i className="bi bi-book-half icon"></i> Leave Management</h1>
      <div className="d-flex gap-3 my-3">
        <button className="btn btn-primary bg-color" onClick={()=>setLeaves(allLeaves)}>Leave History</button>
        <button className="btn btn-primary bg-color" onClick={()=>leaveFilter("PENDING")}>Applied Leaves</button>
        <button className="btn btn-primary bg-color" onClick={()=>leaveFilter("APPROVED")}>Ongoing Leaves</button>
        <button className="btn btn-primary bg-color" onClick={()=>leaveFilter("RECALLED")}>Recall Request</button>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">NAME</th>
            <th scope="col">DURATION</th>
            <th scope="col">START</th>
            <th scope="col">END</th>
            <th scope="col">TYPE</th>
            <th scope="col">REASON</th>
            <th scope="col">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {leaves.length ?leaves.map((leave: any)=>(
            <tr key={leave.id}>
              <td>{leave.employee.firstName}</td>
              <td>{getDaysDifference(leave.startDate,leave.endDate)}</td>
              <td>{formatToIndianDate(leave.startDate)}</td>
              <td>{formatToIndianDate(leave.endDate)}</td>
              <td>{leave.leaveType}</td>
              <td>{leave.reason}</td>
              <td>{leave.status == "PENDING" ? 
                (<button className="btn btn-primary bg-color" onClick={()=>navigate("confirm",{state:{leave}})}>Approve/Reject</button>) 
                : leave.status == "APPROVED" ? (<button className="btn btn-danger" onClick={()=>navigate("recall",{state:{leave}})}>Recall</button>) :
                (<button className="btn btn-warning" onClick={()=>cancelRecall(leave.id)} disabled={load}>
                  {load? <Loader></Loader> : "Cancel Recall"}
                </button>) }
              </td>
            </tr>
          )): (<tr className=" text-secondary">NO RECORDS FOUND</tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default Leaves