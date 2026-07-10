import { useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import EmployeeDashboard from "./EmployeeDashboard";
import AdminDashboard from "../components/AdminDashboard";
import EmployeeAnalytics from "../components/EmployeeAnalytics";

function Home({ darkMode }) {
  const [refresh, setRefresh] =useState(false);
  const [selectedEmployee,setSelectedEmployee]=useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  if(user?.role!=="admin"){
    return <EmployeeDashboard />;
  }

  return (
   <div
  style={{
    minHeight: "100vh",
    background: darkMode ? "#0f172a" : "#eef3f9",
    transition: "0.3s",
  }}
>

      {/* Hero */}

  

<div
  style={{
    background: darkMode
  ? "linear-gradient(135deg,#111827,#1f2937)"
  : "linear-gradient(135deg,#2563eb,#1e40af)",
    color: "white",
    padding: "80px 20px",
    textAlign: "center",
    borderBottomLeftRadius: "30px",
    borderBottomRightRadius: "30px",
    boxShadow: darkMode
  ? "0 10px 30px rgba(0,0,0,.45)"
  : "0 10px 30px rgba(0,0,0,.15)",
  }}
>
  <h1
    style={{
      fontSize: "55px",
      fontWeight: "800",
      marginBottom: "15px",
    }}
  >
    Employee Management System
  </h1>

  <p
    style={{
      fontSize: "20px",
      opacity: 0.95,
      marginBottom: "35px",
    }}
  >
    Manage Employees, Departments & Company Records Efficiently
  </p>

  <div className="d-flex justify-content-center gap-3 flex-wrap">

    <button
      className="btn btn-light btn-lg px-4 fw-bold shadow"
      onClick={() =>
        window.scrollTo({
          top: 650,
          behavior: "smooth",
        })
      }
    >
      ➕ Add Employee
    </button>

    <button
      className="btn btn-outline-light btn-lg px-4 fw-bold"
      onClick={() =>
        window.scrollTo({
          top: 1650,
          behavior: "smooth",
        })
      }
    >
      📊 View Analytics
    </button>

  </div>
</div>



      <div className="container py-4">

       <AdminDashboard refresh={refresh} />

        <EmployeeForm
          refresh={refresh}
          setRefresh={setRefresh}
          selectedEmployee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
          darkMode={darkMode}
        />

       <EmployeeList
    refresh={refresh}
    setRefresh={setRefresh}
    setSelectedEmployee={setSelectedEmployee}
    darkMode={darkMode}
/>

<div id="analytics-section">
    <EmployeeAnalytics refresh={refresh} />
</div>


      </div>

    </div>
  );
}

export default Home;