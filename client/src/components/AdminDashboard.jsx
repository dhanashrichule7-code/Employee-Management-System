import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/dashboardService";

function AdminDashboard({ refresh }) {
  const [stats, setStats] = useState({
  totalEmployees: 0,
  maleEmployees: 0,
  femaleEmployees: 0,
  departments: 0,
  totalSalary: 0,
  averageSalary: 0,
  highestSalary: 0,
  latestEmployee: null,
});

 useEffect(() => {
  fetchStats();
}, [refresh]);

  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
   <div className="row g-4 mt-n5 position-relative">

      {/* Total Employees */}
      <div className="col-lg-3 col-md-6 mb-4">
        <div
  className="card border-0 shadow-lg rounded-4 text-center h-100"
  style={{
    transition: "0.3s",
    cursor: "pointer",
    minHeight: "240px",
  }}
>
      <div className="card-body d-flex flex-column justify-content-center">
            <div style={{ fontSize: "60px" }}>👥</div>
            <h5 className="mt-3">Total Employees</h5>
            <h2 className="text-primary fw-bold">
              {stats.totalEmployees}
            </h2>
          </div>
        </div>
      </div>

      {/* Male */}
      <div className="col-lg-3 col-md-6 mb-4">
        <div
  className="card border-0 shadow-lg rounded-4 text-center h-100"
  style={{
    transition: "0.3s",
    cursor: "pointer",
    minHeight: "240px",
  }}
>
     <div className="card-body d-flex flex-column justify-content-center">
            <div style={{ fontSize: "60px" }}>👨</div>
            <h5 className="mt-3">Male</h5>
            <h2 className="text-success fw-bold">
              {stats.maleEmployees}
            </h2>
          </div>
        </div>
      </div>

      {/* Female */}
      <div className="col-lg-3 col-md-6 mb-4">
        <div
  className="card border-0 shadow-lg rounded-4 text-center h-100"
  style={{
    transition: "0.3s",
    cursor: "pointer",
    minHeight: "240px",
  }}
>
         <div className="card-body d-flex flex-column justify-content-center">
             <div style={{ fontSize: "60px" }}>👩</div>
            <h5 className="mt-3">Female</h5>
            <h2 className="text-danger fw-bold">
              {stats.femaleEmployees}
            </h2>
          </div>
        </div>
      </div>

      {/* Departments */}
      <div className="col-lg-3 col-md-6 mb-4">
        <div
  className="card border-0 shadow-lg rounded-4 text-center h-100"
  style={{
    transition: "0.3s",
    cursor: "pointer",
    minHeight: "240px",
  }}
>
          <div className="card-body d-flex flex-column justify-content-center">
            <div style={{ fontSize: "60px" }}>🏢</div>
            <h5 className="mt-3">Departments</h5>
            <h2 className="text-warning fw-bold">
              {stats.departments}
            </h2>
          </div>
        </div>
      </div>

<div className="col-lg-3 col-md-6 mb-4">
  <div
    className="card border-0 shadow-lg rounded-4 text-center h-100"
    style={{
      transition: "0.3s",
      cursor: "pointer",
      minHeight: "240px",
    }}
  >
    <div className="card-body d-flex flex-column justify-content-center">
      <div style={{ fontSize: "60px" }}>💰</div>
      <h5 className="mt-3">Total Salary</h5>
      <h2 className="text-success fw-bold">
        ₹ {stats.totalSalary.toLocaleString()}
      </h2>
    </div>
  </div>
</div>

<div className="col-lg-3 col-md-6 mb-4">
  <div
    className="card border-0 shadow-lg rounded-4 text-center h-100"
    style={{
      transition: "0.3s",
      cursor: "pointer",
      minHeight: "240px",
    }}
  >
    <div className="card-body d-flex flex-column justify-content-center">
      <div style={{ fontSize: "60px" }}>📈</div>
      <h5 className="mt-3">Average Salary</h5>
      <h2 className="text-primary fw-bold">
        ₹ {stats.averageSalary.toLocaleString()}
      </h2>
    </div>
  </div>
</div>

<div className="col-lg-3 col-md-6 mb-4">
  <div
    className="card border-0 shadow-lg rounded-4 text-center h-100"
    style={{
      transition: "0.3s",
      cursor: "pointer",
      minHeight: "240px",
    }}
  >
    <div className="card-body d-flex flex-column justify-content-center">
      <div style={{ fontSize: "60px" }}>🏆</div>
      <h5 className="mt-3">Highest Salary</h5>
      <h2 className="text-warning fw-bold">
        ₹ {stats.highestSalary.toLocaleString()}
      </h2>
    </div>
  </div>
</div>

<div className="col-lg-3 col-md-6 mb-4">
  <div
    className="card border-0 shadow-lg rounded-4 text-center h-100"
    style={{
      transition: "0.3s",
      cursor: "pointer",
      minHeight: "240px",
    }}
  >
    <div className="card-body d-flex flex-column justify-content-center">
      <div style={{ fontSize: "60px" }}>🆕</div>
      <h5 className="mt-3">Latest Employee</h5>

      <h4 className="text-info fw-bold">
        {stats.latestEmployee?.name || "N/A"}
      </h4>

      <small className="text-muted">
        {stats.latestEmployee?.department}
      </small>
    </div>
  </div>
</div>


    </div>
  );
}

export default AdminDashboard;