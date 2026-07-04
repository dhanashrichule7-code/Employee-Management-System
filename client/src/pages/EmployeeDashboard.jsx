function EmployeeDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="container mt-5">
      <div className="card shadow p-5 text-center">

        <h2>👋 Welcome, {user?.name}</h2>

        <p className="mt-3 fs-5">
          Role:
          <span className="badge bg-success ms-2">
            {user?.role}
          </span>
        </p>

        <hr />

        <h5 className="text-muted">
          You can manage your own profile and change your password.
        </h5>

      </div>
    </div>
  );
}

export default EmployeeDashboard;