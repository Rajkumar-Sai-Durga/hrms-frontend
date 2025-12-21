import axios from "axios";
// import "./emIssues.css";s
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EmIssues = () => {
  const [issues, setIssues] = useState([]);
  const [showRaise, setShowRaise] = useState(false);
  const [raiseCategory, setRaiseCategory] = useState<string>("Complaint");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<string>("MEDIUM");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showIssueDetails, setShowIssueDetails] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<any>(null);

  const userStr = localStorage.getItem("userInfo");
  const user = userStr ? JSON.parse(userStr) : null;
  const employeeId = user?.employeeId;

  const apiCall = async () => {
    try {
      const resp = await axios.get(`http://localhost:8080/api/issue/employee/${employeeId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      setIssues(resp.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    apiCall();
  }, []);

  const openRaise = (category: string) => {
    setRaiseCategory(category);
    setTitle("");
    setDescription("");
    setPriority("MEDIUM");
    setShowRaise(true);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = {
      issue: title,
      description,
      category: raiseCategory,
      priority,
      employeeId,
    };

    try {
      const resp = await axios.post("http://localhost:8080/api/issue/employee/"+employeeId, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      toast.success(resp.data?.message || "Issue raised");
      setShowRaise(false);
      apiCall();
    } catch (err: any) {
      console.error(err);
      const msg = err?.response?.data?.message || "Request failed";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteIssue = async(id: number)=>{
    try {
      let resp = await axios.delete(`http://localhost:8080/api/issue/employee/${id}`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      })
      toast.success(resp.data?.message || "Issue raised");
      apiCall();
    } catch (error) {
      toast.error("Request failed")
    }
  }

  return (
    <div className="container bg-whilte height p-5">
      <div>
        <h4><i className="bi bi-info-circle-fill icons"></i>  Raise Issues</h4>
        <div className="d-flex justify-content-between py-3">
          <div className="bg-color text-light d-flex gap-3 px-4 py-3 rounded-3">
            <div className="d-flex flex-column justify-content-center">
              <h5>Complaint issue</h5>
              <button className="btn btn-warning apply" onClick={() => openRaise("Complaint")}>Raise</button>
            </div>
          </div>
          <div className="bg-color text-light d-flex gap-3 px-4 py-3 rounded-3">
            <div className="d-flex flex-column justify-content-center">
              <h5>Payout related</h5>
              <button className="btn btn-warning apply" onClick={() => openRaise("Payout related")}>Raise</button>
            </div>
          </div>
          <div className="bg-color text-light d-flex gap-3 px-4 py-3 rounded-3">
            <div className="d-flex flex-column justify-content-center">
              <h5>Work related</h5>
              <button className="btn btn-warning apply" onClick={() => openRaise("Work related")}>Raise</button>
            </div>
          </div>
          <div className="bg-color text-light d-flex gap-3 px-4 py-3 rounded-3">
            <div className="d-flex flex-column justify-content-center">
              <h5>Other issue</h5>
              <button className="btn btn-warning apply" onClick={() => openRaise("Other")}>Raise</button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div>
          <h6 className="color">Issues History</h6>
        </div>
        <table className="table table-hover rounded-3">
          <thead>
            <tr>
              <th>ISSUE</th>
              <th>CATEGORY</th>
              <th>PRIORITY</th>
              <th>DESCRIPTION</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {issues.length ? issues.map((it: any) => (
              <tr key={it.id}>
                <td>{it.issue}</td>
                <td>{it.category}</td>
                <td>{it.priority}</td>
                <td>{it.description}</td>
                <td className="d-flex gap-4">
                  <i className="bi bi-eye-fill hover" onClick={()=>{ setSelectedIssue(it); setShowIssueDetails(true); }}></i>
                  <i className="bi bi-trash3-fill" onClick={()=>{deleteIssue(it.id)}}></i>
                </td>
              </tr>
            )) : (
              <tr className="text-secondary"><td colSpan={4}>NO RECORDS FOUND</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showRaise && createPortal(
        <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-modal="true"
          style={{ zIndex: 2000, position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="modal-dialog modal-lg" style={{ maxWidth: 900, zIndex: 100001, position: "relative" }}>
            <div className="modal-content" style={{ position: "relative", zIndex: 100002 }}>
              <div className="modal-header">
                <h5 className="modal-title">Raise Issue</h5>
                <button className="btn-close" onClick={() => setShowRaise(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Issue</label>
                    <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required />
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Category</label>
                      <input className="form-control" value={raiseCategory} readOnly />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Priority</label>
                      <select className="form-select" value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option>HIGH</option>
                        <option>MEDIUM</option>
                        <option>LOW</option>
                      </select>
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-primary" type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit"}</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowRaise(false)} disabled={isSubmitting}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" style={{ zIndex: 1990, position: "fixed", inset: 0 }}></div>
        </div>,
        document.body
      )}
      {showIssueDetails && createPortal(
        <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-modal="true"
          style={{ zIndex: 2000, position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="modal-dialog modal-lg" style={{ maxWidth: 900, zIndex: 100001, position: "relative" }}>
            <div className="modal-content" style={{ position: "relative", zIndex: 100002 }}>
              <div className="modal-header">
                <h5 className="modal-title">Issue Details</h5>
                <button className="btn-close" onClick={() => setShowIssueDetails(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="row mb-2">
                  <div className="col-md-6"><strong>Issue:</strong> {selectedIssue?.issue || "—"}</div>
                  <div className="col-md-6 text-end"><strong>Status:</strong> <span className="badge bg-info ms-2">{selectedIssue?.status || "—"}</span></div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-6"><strong>Category:</strong> {selectedIssue?.category || "—"}</div>
                  <div className="col-md-6"><strong>Priority:</strong> {selectedIssue?.priority || "—"}</div>
                </div>
                <div className="mb-2">
                  <strong>Description:</strong>
                  <p className="border rounded p-2 mt-1">{selectedIssue?.description || "—"}</p>
                </div>
                <div className="row mb-2">
                  <div className="col-md-6"><strong>Applied At:</strong> {selectedIssue?.appliedAt ? new Date(selectedIssue.appliedAt).toLocaleDateString("en-IN") : "—"}</div>
                  <div className="col-md-6"><strong>Resolved At:</strong> {selectedIssue?.resolvedAt ? new Date(selectedIssue.resolvedAt).toLocaleDateString("en-IN") : "—"}</div>
                </div>
                <div className="row">
                  <div className="col-md-6"><strong>Resolved By:</strong> {selectedIssue?.resolvedByName || "—"}</div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowIssueDetails(false)}>Close</button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" style={{ zIndex: 1990, position: "fixed", inset: 0 }}></div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default EmIssues;