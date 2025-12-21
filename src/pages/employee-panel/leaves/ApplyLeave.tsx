import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type ApplyLeaveProps = {
  leaveType?: string;
  onCancel?: () => void;
};

const ApplyLeave: React.FC<ApplyLeaveProps> = ({ leaveType: initialLeaveType, onCancel }) => {
  const navigate = useNavigate();

  const [leaveType, setLeaveType] = useState<string>(initialLeaveType || "SICK");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      leaveType,
      startDate,
      endDate,
      reason,
    };

    try {
      const token = localStorage.getItem("accessToken");
      
      const response = await axios.post("http://localhost:8080/api/leaves/apply", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success(response.data?.message || "Leave applied successfully");
      if (onCancel) onCancel();
      else navigate(-1);
    } catch (error: any) {
      console.error("Apply leave failed", error);
      const msg = error?.response?.data?.message || "Request failed";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-4">
      <h4>Apply Leave</h4>
      <form onSubmit={handleApply}>
        <div className="mb-3">
          <label className="form-label">Leave Type</label>
          <select className="form-select" value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
            <option>SICK</option>
            <option>Personal</option>
            <option>Annual</option>
            <option>Casual</option>
          </select>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Start Date</label>
            <input className="form-control" type="date" value={startDate || ""} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">End Date</label>
            <input className="form-control" type="date" value={endDate || ""} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Reason</label>
          <textarea className="form-control" rows={3} value={reason} onChange={(e) => setReason(e.target.value)} />
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Applying..." : "Apply"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => (onCancel ? onCancel() : navigate(-1))} disabled={isSubmitting}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplyLeave;


