import { useParams } from "react-router-dom"
import ProfileDashboard from "../profile-dashboard/ProfileDashboard";


const Profille = () => {
  const {employeeId} = useParams();
  return (
    <div>
      <ProfileDashboard employeeId = {employeeId}></ProfileDashboard>
    </div>
  )
}

export default Profille