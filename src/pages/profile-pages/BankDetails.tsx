import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";

const BankDetails = () => {

  const [bankInfo, setBankInfo] = useState([]);
  const {employeeId} = useParams()
  const [showAddBank, setShowAddBank] = useState(false);
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");

  const apiCall = async() =>{
    try {
      let response = await axios.get("http://localhost:8080/api/bank/get/"+employeeId,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      })
      setBankInfo(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteBank = async (id: number) => {
    if (!window.confirm("Delete this bank record?")) return;
    try {
      const idParam = employeeId || "EMP67965";
      await axios.delete(`http://localhost:8080/api/bank/delete/${id}/details?employeeId=${idParam}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      toast.success("Bank record deleted");
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
      {bankInfo.length ? bankInfo.map((bank: any)=>(<div className="card shadow-sm border-0 mb-3" key={bank.id}>
        <div className="card-body">

          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold mb-0">Bank Details</h5>
            <button className="btn btn-sm btn-outline-danger" onClick={() => deleteBank(bank.id)}>
              <i className="bi bi-trash3-fill"></i>
            </button>
          </div>

          {/* Bank Name */}
          <p className="mb-2">
            <strong>Bank Name:</strong> {bank.bankName}
          </p>

          {/* Account Number */}
          <p className="mb-2">
            <strong>Account Number:</strong> {bank.accountNumber}
          </p>

          {/* IFSC Code */}
          <p className="mb-0">
            <strong>IFSC Code:</strong> {bank.ifscCode}
          </p>

        </div>
      </div>)) : (<div>
        <h1 className="text-secondary text-opacity-50 text-center">No Bank Details Available</h1>
      </div>)}

      <div className="my-3 text-center">
        <button
          className="btn btn-primary"
          onClick={() => {
            setBankName("");
            setAccountNumber("");
            setIfscCode("");
            setShowAddBank(true);
          }}
        >
          Add Bank Details
        </button>
      </div>
      {showAddBank && createPortal(
        <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-modal="true"
          style={{ zIndex: 2000, position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="modal-dialog modal-lg" style={{ maxWidth: 700, zIndex: 100001, position: "relative" }}>
            <div className="modal-content" style={{ position: "relative", zIndex: 100002 }}>
              <div className="modal-header">
                <h5 className="modal-title">Add Bank Details</h5>
                <button className="btn-close" onClick={() => setShowAddBank(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={async(e)=>{e.preventDefault(); try{
                  const id = employeeId || "EMP67965";
                  const resp = await axios.post(`http://localhost:8080/api/bank/post/${id}`, { bankName, accountNumber, ifscCode }, { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }});
                  toast.success(resp.data?.message || "Bank details added");
                  setShowAddBank(false);
                  apiCall();
                } catch(err:any){ toast.error(err?.response?.data?.message || "Request failed") }}}>
                  <div className="mb-3">
                    <label className="form-label">Bank Name</label>
                    <input className="form-control" value={bankName} onChange={(e)=>setBankName(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Account Number</label>
                    <input className="form-control" value={accountNumber} onChange={(e)=>setAccountNumber(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">IFSC Code</label>
                    <input className="form-control" value={ifscCode} onChange={(e)=>setIfscCode(e.target.value)} />
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-primary" type="submit">Save</button>
                    <button type="button" className="btn btn-secondary" onClick={()=>setShowAddBank(false)}>Cancel</button>
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

export default BankDetails