import { useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import EmployeeDashboard from "./EmployeeDashboard";
import AdminDashboard from "../components/AdminDashboard";

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
        minHeight:"100vh",
        background:"#f4f7fb",
      }}
    >

      {/* Hero */}

      <div
        style={{
          background:"linear-gradient(135deg,#2563eb,#1e40af)",
          color:"white",
          padding:"70px 20px",
          textAlign:"center",
        }}
      >
        <h1
          style={{
            fontSize:"55px",
            fontWeight:"700",
          }}
        >
          Employee Management System
        </h1>

        <p
          style={{
            fontSize:"22px",
            marginTop:"20px",
            opacity:0.9,
          }}
        >
          Manage Employees, Departments & Company Records
        </p>
      </div>

      <div className="container py-5">

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

      </div>

    </div>
  );
}

export default Home;