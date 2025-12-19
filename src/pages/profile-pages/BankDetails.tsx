import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BankDetails = () => {

  const [bankInfo, setBankInfo] = useState([]);
  const {employeeId} = useParams()

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

  useEffect(()=> {
    apiCall()
  })
  return (
    <div>
      {bankInfo.length ? bankInfo.map((bank: any)=>(
      <div className="card shadow-sm border-0 mb-3" key={bank.id}>
        <div className="card-body">

          {/* Header */}
          <h5 className="fw-bold mb-3">
            Bank Details
          </h5>

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
      </div>
      )) : (<div>
        <h1 className="text-secondary text-opacity-50 text-center">No Bank Details Available</h1>
      </div>)}
    </div>
    
  )
}

export default BankDetails