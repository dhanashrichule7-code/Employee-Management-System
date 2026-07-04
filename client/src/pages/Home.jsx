import { useState } from "react";
import EmployeeList from "../components/EmployeeList";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeDashboard from "./EmployeeDashboard";

function Home({ darkMode }) {
  const [refresh, setRefresh] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {user?.role === "admin" ? (
        <div className="container mt-4">

          <h1 className="text-center text-primary fw-bold mb-4">
            Employee Management System
          </h1>

          <EmployeeForm
            refresh={refresh}
            setRefresh={setRefresh}
            selectedEmployee={selectedEmployee}
            setSelectedEmployee={setSelectedEmployee}
            darkMode={darkMode}
          />

          <EmployeeList
            refresh={refresh}
            setSelectedEmployee={setSelectedEmployee}
            darkMode={darkMode}
          />

        </div>
      ) : (
        <EmployeeDashboard />
      )}
    </>
  );
}

export default Home;