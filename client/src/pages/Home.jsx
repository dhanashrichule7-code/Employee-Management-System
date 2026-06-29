import { useState } from "react";
import EmployeeList from "../components/EmployeeList";
import EmployeeForm from "../components/EmployeeForm";

function Home() {

  const [refresh, setRefresh] = useState(false);

  return (
    <div className="container mt-4">

      <h1 className="text-center text-primary fw-bold mb-4">
        Employee Management System
      </h1>

      <EmployeeForm
        refresh={refresh}
        setRefresh={setRefresh}
      />

      <EmployeeList
        refresh={refresh}
      />

    </div>
  );
}

export default Home;