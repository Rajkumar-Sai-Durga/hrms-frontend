import { createPortal } from "react-dom";

type IssueData = {
  issue?: string;
  description?: string;
  category?: string;
  priority?: string;
  appliedAt?: string | null;
  resolvedById?: string | null;
  resolvedByName?: string | null;
  resolvedAt?: string | null;
  status?: string;
};

interface Props {
  show: boolean;
  onClose: () => void;
  data?: IssueData | null;
}

function formatToIndianDate(dateString?: string | null): string {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

const IssueDetailsModal: React.FC<Props> = ({ show, onClose, data }) => {
  if (!show) return null;
  const d = data || {};

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
            <h5 className="modal-title">Issue Details</h5>
            <button className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>

          <div className="modal-body">
            <div className="row mb-2">
              <div className="col-md-6"><strong>Issue:</strong> {d.issue || "—"}</div>
              <div className="col-md-6 text-end"><strong>Status:</strong> <span className="badge bg-info ms-2">{d.status || "—"}</span></div>
            </div>

            <div className="row mb-2">
              <div className="col-md-6"><strong>Category:</strong> {d.category || "—"}</div>
              <div className="col-md-6"><strong>Priority:</strong> {d.priority || "—"}</div>
            </div>

            <div className="mb-2">
              <strong>Description:</strong>
              <p className="border rounded p-2 mt-1">{d.description || "—"}</p>
            </div>

            <div className="row mb-2">
              <div className="col-md-6"><strong>Applied At:</strong> {formatToIndianDate(d.appliedAt)}</div>
              <div className="col-md-6"><strong>Resolved At:</strong> {formatToIndianDate(d.resolvedAt)}</div>
            </div>

            <div className="row">
              <div className="col-md-6"><strong>Resolved By:</strong> {d.resolvedByName || "—"}</div>
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

export default IssueDetailsModal;


