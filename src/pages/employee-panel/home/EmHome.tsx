import ProfileCard from "../../Employee-dashboard/ProfileCard";
const EmHome = () => {
  return (
    <div className="container">
      <div className="py-3">
        <ProfileCard></ProfileCard>
      </div>
        <div className="row g-4">

          {/* Leave Section */}
          <div className="col-md-6">
            <div className="card p-3 g-flex flex-column gap-3">
              <h6 className="fw-bold">Available Leave Days</h6>

              <small>Annual Leave (10 of 60 days)</small>
              <div className="progress mb-2">
                <div className="progress-bar" style={{ width: "20%" }} />
              </div>

              <small>Sick Leave (0 of 10 days)</small>
              <div className="progress mb-1">
                <div className="progress-bar bg-secondary" style={{ width: "0%" }} />
              </div>

              <small>Compassionate Leave (8 of 15 days)</small>
              <div className="progress">
                <div className="progress-bar bg-warning" style={{ width: "55%" }} />
              </div>
            </div>
          </div>

          {/* To-do Section */}
          <div className="col-md-6">
            <div className="card p-3">
              <h6 className="fw-bold">To-dos</h6>
              <ul className="list-unstyled mt-2">
                <li className="border rounded p-2 mb-2">Complete onboarding document upload</li>
                <li className="border rounded p-2 mb-2">Follow up on client documents</li>
                <li className="border rounded p-2 mb-2">Design wireframes for HRMS</li>
                <li className="border rounded p-2">Create case study for next project</li>
              </ul>
            </div>
          </div>

          {/* Announcements */}
          <div className="col-md-6">
            <div className="card p-3">
              <h6 className="fw-bold">Announcement(s)</h6>
              <p className="mb-2">🎉 Welcome Jill Hixon – new staff joining</p>
              <p className="mb-2">📢 Project Manager meeting at hall</p>
              <p className="mb-0">🏢 Office space update</p>
            </div>
          </div>

          {/* Payslip */}
          <div className="col-md-6">
            <div className="card p-3">
              <h6 className="fw-bold">April Payslip Breakdown</h6>

              <table className="table table-sm mt-2">
                <thead>
                  <tr>
                    <th>Earnings</th>
                    <th>Amount</th>
                    <th>Deductions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Basic Wage</td>
                    <td>₹150,000</td>
                    <td>₹30,000</td>
                  </tr>
                  <tr>
                    <td>Tax</td>
                    <td>₹15,000</td>
                    <td>₹3,000</td>
                  </tr>
                  <tr>
                    <td>Pension</td>
                    <td>₹5,000</td>
                    <td>₹3,000</td>
                  </tr>
                </tbody>
              </table>

              <h6 className="text-end">Total: ₹114,000</h6>
            </div>
          </div>

        </div>
    </div>
  )
}

export default EmHome