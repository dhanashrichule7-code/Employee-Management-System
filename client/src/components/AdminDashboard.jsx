import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/dashboardService";

import {
FaUsers,
FaMars,
FaVenus,
FaBuilding,
FaMoneyBillWave,
FaChartLine,
FaTrophy,
FaUserPlus,
} from "react-icons/fa6";

const dashboardCards = (stats) => [
  {
    title: "Total Employees",
    value: stats.totalEmployees,
    subtitle: "Registered Employees",
    icon: <FaUsers />,
    bg: "#eff6ff",
    color: "#2563eb",
    valueClass: "text-primary",
  },
  {
    title: "Male",
    value: stats.maleEmployees,
    subtitle: "Male Employees",
    icon: <FaMars />,
    bg: "#ecfdf5",
    color: "#16a34a",
    valueClass: "text-success",
  },
  {
    title: "Female",
    value: stats.femaleEmployees,
    subtitle: "Female Employees",
    icon: <FaVenus />,
    bg: "#fef2f2",
    color: "#dc2626",
    valueClass: "text-danger",
  },
  {
    title: "Departments",
    value: stats.departments,
    subtitle: "Active Departments",
    icon: <FaBuilding />,
    bg: "#fffbeb",
    color: "#f59e0b",
    valueClass: "text-warning",
  },
  {
  title: "Total Salary",
  value: `₹ ${stats.totalSalary.toLocaleString()}`,
  subtitle: "Company Payroll",
  icon: <FaMoneyBillWave />,
  bg: "#ecfdf5",
  color: "#059669",
  valueClass: "text-success",
},
  {
    title: "Average Salary",
    value: `₹ ${stats.averageSalary.toLocaleString()}`,
    subtitle: "Per Employee",
   icon: <FaChartLine />,
    bg: "#eff6ff",
    color: "#2563eb",
    valueClass: "text-primary",
  },
  {
    title: "Highest Salary",
    value: `₹ ${stats.highestSalary.toLocaleString()}`,
    subtitle: "Maximum Package",
    icon: <FaTrophy />,
    bg: "#fffbeb",
    color: "#d97706",
    valueClass: "text-warning",
  },
  {
    title: "Latest Employee",
    value: stats.latestEmployee?.name || "N/A",
    subtitle: stats.latestEmployee?.department || "",
    icon: <FaUserPlus />,
    bg: "#ecfeff",
    color: "#06b6d4",
    valueClass: "text-info",
  },
];

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

  {dashboardCards(stats).map((card, index) => (

    <div
      className="col-lg-3 col-md-6 mb-4"
      key={index}
    >

      <div className="card dashboard-card border-0 shadow h-100">

        <div
          className="card-body text-center d-flex flex-column justify-content-center align-items-center"
          style={{
            padding: "25px 20px",
          }}
        >

          <div
            className="dashboard-icon"
            style={{
              background: card.bg,
              color: card.color,
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "34px",
              marginBottom: "18px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            }}
          >
            {card.icon}
          </div>

          <h5
            style={{
              fontWeight: "700",
              marginBottom: "12px",
            }}
          >
            {card.title}
          </h5>

          <h2
            className={card.valueClass}
            style={{
              fontWeight: "800",
              fontSize: "30px",
              marginBottom: "8px",
            }}
          >
            {card.value}
          </h2>

          <p
            className="text-muted"
            style={{
              fontSize: "13px",
              marginBottom: 0,
            }}
          >
            {card.subtitle}
          </p>

        </div>

      </div>

    </div>

  ))}

</div>

  );
}



export default AdminDashboard;