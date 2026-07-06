import { useNavigate } from "react-router-dom";

function EmployeeDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  let completion = 0;

  if (user?.name) completion += 25;
  if (user?.email) completion += 25;
  if (user?.photo) completion += 25;
  completion += 25;

  return (
    <div className="container mt-4">

      <div className="card shadow border-0">

        <div className="card-body p-5">

          <div className="text-center">

            <img
              src={
                user?.photo
                  ? `http://localhost:5000/uploads/${user.photo}`
                  : `https://ui-avatars.com/api/?name=${user?.name}`
              }
              alt="Profile"
              className="rounded-circle shadow mb-3"
              style={{
                width: "130px",
                height: "130px",
                objectFit: "cover",
                border: "4px solid #0d6efd",
              }}
            />

            <h2 className="fw-bold">
              Welcome, {user?.name}
            </h2>

            <span className="badge bg-success fs-6 mt-2">
              Employee
            </span>

          </div>

          <hr className="my-4" />

          <div className="row text-center">

            <div className="col-md-4 mb-3">

              <div className="card shadow-sm h-100">

                <div className="card-body">

                  <h5 className="text-primary">
                    📧 Email
                  </h5>

                  <p className="mb-0">
                    {user?.email}
                  </p>

                </div>

              </div>

            </div>

            <div className="col-md-4 mb-3">

              <div className="card shadow-sm h-100">

                <div className="card-body">

                  <h5 className="text-primary">
                    🛡 Role
                  </h5>

                  <p className="mb-0">
                    {user?.role}
                  </p>

                </div>

              </div>

            </div>

            <div className="col-md-4 mb-3">

              <div className="card shadow-sm h-100">

                <div className="card-body">

                  <h5 className="text-primary">
                    📅 Joined
                  </h5>

                  <p className="mb-0">
                    {new Date(user?.createdAt).toLocaleDateString()}
                  </p>

                </div>

              </div>

            </div>

          </div>

          <div className="mt-4">

            <div className="d-flex justify-content-between mb-2">

              <strong>Profile Completion</strong>

              <strong>{completion}%</strong>

            </div>

            <div className="progress">

              <div
                className="progress-bar bg-success"
                style={{
                  width: `${completion}%`,
                }}
              ></div>

            </div>

          </div>

          <div className="mt-5 text-center">

            <button
              className="btn btn-primary me-3"
              onClick={() => navigate("/profile")}
            >
              👤 My Profile
            </button>

            <button
              className="btn btn-warning"
              onClick={() => navigate("/change-password")}
            >
              🔒 Change Password
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default EmployeeDashboard;