


import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

interface LeaveData {
  leaveType: string;
  reason: string;
  startDate: string | null;
  endDate: string | null;
  appliedAt: string | null;
  status: string;
  approvedBy: any;
  approvedByName: string | null;
  decisionAt: string | null;
}

interface Props {
  show: boolean;
  onClose: () => void;
  data?: LeaveData | null;
}

const LeaveDetailsModal = ({ show, onClose, data }: Props) => {
  if (!show) return null;

  const d: LeaveData = data || {
    leaveType: "—",
    reason: "",
    startDate: null,
    endDate: null,
    appliedAt: null,
    status: "—",
    approvedBy: null,
    approvedByName: null,
    decisionAt: null,
  };

  function formatToIndianDate(dateString: string | null): string {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  const navigate = useNavigate();

  const modal = (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      style={{
        zIndex: 99999,
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
            <h5 className="modal-title">Leave Application Details</h5>
            <button className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>

          <div className="modal-body">
            <div className="row mb-3">
              <div className="col-md-6"><strong>Leave Type:</strong> {d.leaveType}</div>
              <div className="col-md-6 text-end">
                <strong>Status:</strong> <span className={d.status == "APPROVED"? "badge bg-success ms-2": "badge bg-warning ms-2"}>{d.status}</span>
                {d.status === "PENDING" && (
                  <i
                    className="bi bi-pencil-square ms-3"
                    role="button"
                    title="Edit leave"
                    style={{ cursor: "pointer", fontSize: 18 }}
                    onClick={() =>
                      navigate("/employee-dashboard/leaves/edit", {
                        state: { leave: d },
                      })
                    }
                  ></i>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6"><strong>Start Date:</strong> {formatToIndianDate(d.startDate)}</div>
              <div className="col-md-6"><strong>End Date:</strong> {formatToIndianDate(d.endDate)}</div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6"><strong>Applied At:</strong> {formatToIndianDate(d.appliedAt)}</div>
              <div className="col-md-6"><strong>Decision At:</strong> {d.decisionAt ? formatToIndianDate(d.decisionAt) : "—"}</div>
            </div>

            <div className="mb-3">
              <strong>Reason:</strong>
              <div className="border rounded p-2 mt-1" style={{ minHeight: 48 }}>{d.reason || "—"}</div>
            </div>

            <div className="row">
              <div className="col-md-6"><strong>Approved By:</strong> {d.approvedByName || "—"}</div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show" style={{ zIndex: 99990, position: "fixed", inset: 0 }}></div>
    </div>
  );

  return createPortal(modal, document.body);
};

export default LeaveDetailsModal;
  