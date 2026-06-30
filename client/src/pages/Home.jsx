import { useState } from "react";
import EmployeeList from "../components/EmployeeList";
import EmployeeForm from "../components/EmployeeForm";

function Home() {

  const [refresh, setRefresh] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  return (
    <div className="container mt-4">

      <h1 className="text-center text-primary fw-bold mb-4">
        Employee Management System
      </h1>

      <EmployeeForm
  refresh={refresh}
  setRefresh={setRefresh}
  selectedEmployee={selectedEmployee}
  setSelectedEmployee={setSelectedEmployee}
/>

      <EmployeeList
  refresh={refresh}
  setSelectedEmployee={setSelectedEmployee}
/>

    </div>
  );
}

export default Home;