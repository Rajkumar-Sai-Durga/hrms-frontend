import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface LeaveData {
  leaveType: string;
  id?: number | string;
  reason: string;
  startDate: string | null;
  endDate: string | null;
  appliedAt: string | null;
  status: string;
  approvedBy: any;
  approvedByName: string | null;
  decisionAt: string | null;
}

const defaultLeave: LeaveData = {
  leaveType: "Personal",
  reason: "vaction with family",
  startDate: "2025-12-20",
  endDate: "2026-01-12",
  appliedAt: null,
  status: "PENDING",
  approvedBy: null,
  approvedByName: null,
  decisionAt: null,
};

const EditLeave = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navState: any = location.state;
  const incoming: LeaveData = navState?.leave;

  const [leaveType, setLeaveType] = useState<string>(incoming?.leaveType || defaultLeave.leaveType);
  const [startDate, setStartDate] = useState<string>(incoming?.startDate ? incoming.startDate.slice(0, 10) : defaultLeave.startDate!);
  const [endDate, setEndDate] = useState<string>(incoming?.endDate ? incoming.endDate.slice(0, 10) : defaultLeave.endDate!);
  const [reason, setReason] = useState<string>(incoming?.reason || defaultLeave.reason);

  useEffect(() => {
    if (incoming) {
      setLeaveType(incoming.leaveType);
      setStartDate(incoming.startDate ? incoming.startDate.slice(0, 10) : "");
      setEndDate(incoming.endDate ? incoming.endDate.slice(0, 10) : "");
      setReason(incoming.reason || "");
    }
  }, [incoming]);

  const handleSave = async (e: any) => {
    e.preventDefault();

    if (!incoming || !incoming.id) {
      toast.error("Missing leave id; cannot update.");
      return;
    }

    const payload = {
      leaveType,
      startDate,
      endDate,
      reason,
    };

    try {
      const response = await axios.put(
        `http://localhost:8080/api/leaves/update/${incoming.id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data?.message || "Leave updated");
      navigate(-1);
    } catch (error: any) {
      console.error("Update failed", error);
      const msg = error?.response?.data?.message || "Request failed";
      toast.error(msg);
    }
  };

  return (
    <div className="container py-4">
      <h4>Edit Leave</h4>
      <form onSubmit={handleSave}>
        <div className="mb-3">
          <label className="form-label">Leave Type</label>
          <select className="form-select" value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
            <option>Personal</option>
            <option>SICK</option>
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
          <button className="btn btn-primary" type="submit">Save</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditLeave;


