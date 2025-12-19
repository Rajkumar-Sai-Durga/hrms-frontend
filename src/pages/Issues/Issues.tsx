import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const Issues = () => {
  const [issues, setIssues] = useState([]);
  const [allIssues, setAllIssues] =useState([])

  const userStr = localStorage.getItem("userInfo");
  const user = userStr ? JSON.parse(userStr) : null;
  const employeeId = user?.employeeId;

  const apiCall = async()=>{
    try {
      let response = await axios.get("http://localhost:8080/api/issue/admin/getAll",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      })
      setAllIssues(response.data.data)
      setIssues(response.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    apiCall()
  },[])

  const filterIssues = (status: any)=>{
    setIssues(allIssues.filter((issue: any)=>issue.status == status))
  }

  const updateIssue = async(status: string, id: number)=>{
    try {
      let obj ={
        status: status
      }
      let response = await axios.put(`http://localhost:8080/api/issue/admin/${id}/update?adminId=${employeeId}`,obj,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      })
      window.location.reload();
    } catch (error) {
      toast.error("server not responding")
    }
  }

  return (
    <div>
      <h1><i className="bi bi-info-circle-fill icon"></i> Leave Management</h1>
      <div className="d-flex gap-3 my-3">
        <button className="btn btn-primary bg-color" onClick={()=>setIssues(allIssues)}>ALL</button>
        <button className="btn btn-primary bg-color" onClick={()=>filterIssues("SOLVED")}>SOLVED</button>
        <button className="btn btn-primary bg-color" onClick={()=>filterIssues("PENDING")}>RAISED</button>
        <button className="btn btn-primary bg-color"  onClick={()=>filterIssues("MARKED")}>MARKED</button>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">NAME</th>
            <th scope="col">ISSUE</th>
            <th scope="col">DESCRIPTION</th>
            <th scope="col">CATEGORY</th>
            <th scope="col">PRIORITY</th>
            <th scope="col">RAISED</th>
            <th scope="col">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {issues.length ? issues.map((issue: any)=>(
            <tr key={issue.id}>
              <td>{issue.employee.firstName}</td>
              <td>{issue.issue}</td>
              <td>{issue.description}</td>
              <td>{issue.category}</td>
              <td>{issue.priority}</td>
              <td>{issue.appliedAt}</td>
              <td>{issue.status == "PENDING" ? (<button className="btn btn-danger" onClick={()=>updateIssue("MARKED", issue.id)}>MARK</button>) :
                issue.status == "MARKED" ? (<button className="btn btn-warning" onClick={()=>updateIssue("SOLVED", issue.id)}>SOLVE</button>) :
                (<button className="btn btn-success" disabled={true}>SOLVED</button>)
              }</td>
            </tr>
          ))
          :(
            <tr className="text-secondary">NO RECORDS FOUND</tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
