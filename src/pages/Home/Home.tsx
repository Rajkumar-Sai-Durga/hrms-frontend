
const Home = () => {
  return (
    <div className="container-fluid p-4 bg-light min-vh-100">

      {/* Top Stats */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card bg-warning text-dark shadow-sm">
            <div className="card-body">
              <h3 className="fw-bold">138</h3>
              <p className="mb-0">Messages</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-primary text-white shadow-sm">
            <div className="card-body">
              <h3 className="fw-bold">50</h3>
              <p className="mb-0">Jobs</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-success text-white shadow-sm">
            <div className="card-body">
              <h3 className="fw-bold">100</h3>
              <p className="mb-0">Candidates</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-dark text-white shadow-sm">
            <div className="card-body">
              <h3 className="fw-bold">50</h3>
              <p className="mb-0">Resumes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="row g-4">

        {/* Applied Jobs */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header fw-bold">Applied Jobs</div>
            <div className="card-body">

              <div className="d-flex justify-content-between bg-light p-2 rounded mb-2">
                <div>
                  <strong>Sales Executive</strong>
                  <div className="text-muted small">Access Bank</div>
                </div>
                <small>20 mins ago</small>
              </div>

              <div className="d-flex justify-content-between bg-light p-2 rounded mb-2">
                <div>
                  <strong>User Experience Designer</strong>
                  <div className="text-muted small">Paystack</div>
                </div>
                <small>10 mins ago</small>
              </div>

              <div className="d-flex justify-content-between bg-light p-2 rounded">
                <div>
                  <strong>Product Manager</strong>
                  <div className="text-muted small">T-Pay</div>
                </div>
                <small>5 mins ago</small>
              </div>

            </div>
          </div>
        </div>

        {/* Employees */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header fw-bold">Employees</div>
            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center bg-light p-2 rounded mb-2">
                <div>
                  <strong>John Doe</strong>
                  <div className="text-muted small">Role: Product Manager</div>
                </div>
                <button className="btn btn-sm btn-outline-primary">View</button>
              </div>

              <div className="d-flex justify-content-between align-items-center bg-light p-2 rounded mb-2">
                <div>
                  <strong>Ginna Loe</strong>
                  <div className="text-muted small">Role: Sales Executive</div>
                </div>
                <button className="btn btn-sm btn-outline-primary">View</button>
              </div>

              <div className="d-flex justify-content-between align-items-center bg-light p-2 rounded">
                <div>
                  <strong>John Dore</strong>
                  <div className="text-muted small">Role: UI/UX Designer</div>
                </div>
                <button className="btn btn-sm btn-outline-primary">View</button>
              </div>

            </div>
          </div>
        </div>

        {/* Candidates */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header fw-bold">Candidates</div>
            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center bg-light p-2 rounded mb-2">
                <div>
                  <strong>John Doe</strong>
                  <div className="text-muted small">Applied for: Product Manager</div>
                </div>
                <span className="badge bg-primary">80</span>
              </div>

              <div className="d-flex justify-content-between align-items-center bg-light p-2 rounded mb-2">
                <div>
                  <strong>Ginna Loe</strong>
                  <div className="text-muted small">Applied for: Sales Executive</div>
                </div>
                <span className="badge bg-danger">30</span>
              </div>

              <div className="d-flex justify-content-between align-items-center bg-light p-2 rounded">
                <div>
                  <strong>James Foe</strong>
                  <div className="text-muted small">Applied for: Product Manager</div>
                </div>
                <span className="badge bg-primary">80</span>
              </div>

            </div>
          </div>
        </div>

        {/* Payrolls */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header fw-bold">April Payrolls</div>
            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center bg-light p-2 rounded mb-2">
                <div>
                  <strong>John Doe</strong>
                  <div className="text-muted small">Salary: ₹50,000</div>
                </div>
                <span className="badge bg-success">Paid</span>
              </div>

              <div className="d-flex justify-content-between align-items-center bg-light p-2 rounded mb-2">
                <div>
                  <strong>Ginna Loe</strong>
                  <div className="text-muted small">Salary: ₹45,000</div>
                </div>
                <span className="badge bg-warning text-dark">Processing</span>
              </div>

              <div className="d-flex justify-content-between align-items-center bg-light p-2 rounded">
                <div>
                  <strong>James Foe</strong>
                  <div className="text-muted small">Salary: ₹48,000</div>
                </div>
                <span className="badge bg-warning text-dark">Processing</span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
