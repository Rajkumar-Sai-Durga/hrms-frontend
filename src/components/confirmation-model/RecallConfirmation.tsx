import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const RecallConfirmation = () => {
    const navigete = useNavigate()

    const location = useLocation();
    const data = location.state.leave;

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

    const updateLeave = async (decision: string, id: number)=>{
        try {
            let obj ={
                status : decision
            }

            let response = await axios.put("http://localhost:8080/api/leaves/applied/"+id, obj, {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            if(response.status){
                navigete("/dashboard/leaves")
            }
            
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4" style={{ width: "500px" }}>

        <h4 className="text-center mb-4 text-warning">
          Recall Leave Request
        </h4>

        <div className="mb-3 d-flex justify-content-between">
          <strong>Name:</strong>
          <span>{data.employee.firstName}</span>
        </div>

        <div className="mb-3 d-flex justify-content-between">
          <strong>Duration:</strong>
          <span>{getDaysDifference(data.startDate,data.endDate)} Days</span>
        </div>

        <div className="mb-3 d-flex justify-content-between">
          <strong>Start:</strong>
          <span>{formatToIndianDate(data.startDate)}</span>
        </div>

        <div className="mb-3 d-flex justify-content-between">
          <strong>End:</strong>
          <span>{formatToIndianDate(data.endDate)}</span>
        </div>

        <div className="mb-3 d-flex justify-content-between">
          <strong>Type:</strong>
          <span>{data.leaveType}</span>
        </div>

        <div className="mb-4">
          <strong>Reason:</strong>
          <p className="mt-2 mb-0 text-muted">
            {data.reason}
          </p>
        </div>

        <div className="alert alert-warning text-center mb-4">
          Are you sure you want to recall this leave request?
        </div>

        <div className="d-flex gap-3">
          <button className="btn btn-warning w-100" onClick={()=>updateLeave("RECALLED", data.id)}>
            Recall
          </button>
          <button className="btn btn-secondary w-100" onClick={()=>navigete("/dashboard/leaves")}>
            Cancel
          </button>
        </div>

      </div>
    </div>
  )
}

export default RecallConfirmation