import { useState, useEffect } from "react";
import {
  createEmployee,
  updateEmployee,
} from "../services/employeeService";

function EmployeeForm({
  refresh,
  setRefresh,
  selectedEmployee,
  setSelectedEmployee,
}) {

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    salary: ""
  });

 useEffect(() => {
  if (selectedEmployee) {
    setEmployee(selectedEmployee);
  } else {
    setEmployee({
      name: "",
      email: "",
      phone: "",
      department: "",
      position: "",
      salary: "",
    });
  }
}, [selectedEmployee]);

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    if (selectedEmployee) {

      await updateEmployee(selectedEmployee._id, employee);

      alert("Employee Updated Successfully");

    } else {

      await createEmployee(employee);

      alert("Employee Added Successfully");

    }

    setEmployee({
      name: "",
      email: "",
      phone: "",
      department: "",
      position: "",
      salary: "",
    });

    setSelectedEmployee(null);

    setRefresh(!refresh);

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="card shadow p-4 mb-4">

      <h3 className="text-center mb-4">
            {selectedEmployee ? "Update Employee" : "Add Employee"}
      </h3>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <input
            type="text"
            name="name"
            placeholder="Employee Name"
            className="form-control"
            value={employee.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control"
            value={employee.email}
            onChange={handleChange}
          />
        </div>
        
        <div className="mb-3">
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="form-control"
            value={employee.phone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="department"
            placeholder="Department"
            className="form-control"
            value={employee.department}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="position"
            placeholder="Position"
            className="form-control"
            value={employee.position}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            className="form-control"
            value={employee.salary}
            onChange={handleChange}
          />
        </div>

        <button
             className="btn btn-primary w-100"
                 type="submit"
         >
                {selectedEmployee ? "Update Employee" : "Add Employee"}
        </button>

      </form>

    </div>
  );
}

export default EmployeeForm;