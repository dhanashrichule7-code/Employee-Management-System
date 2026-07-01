import { useState, useEffect } from "react";
import {
  createEmployee,
  updateEmployee,
} from "../services/employeeService";
import { toast } from "react-toastify";

function EmployeeForm({
  refresh,
  setRefresh,
  selectedEmployee,
  setSelectedEmployee,
  darkMode,
}) {

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    salary: ""
  });

   const [loading, setLoading] = useState(false);

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

  // Validation
  if (
    !employee.name ||
    !employee.email ||
    !employee.phone ||
    !employee.department ||
    !employee.position ||
    !employee.salary
  ) {
    toast.warning("Please fill all fields.");
    return;
  }

  setLoading(true);
 




  try {
    if (selectedEmployee) {
      await updateEmployee(selectedEmployee._id, employee);

      toast.success("Employee Updated Successfully");
    } else {
      await createEmployee(employee);

      toast.success("Employee Added Successfully");
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
    setLoading(false);

  } catch (error) {
    console.log(error);
     toast.error("Something went wrong!");
   setLoading(false);
  }
};

  return (
    <div
  className={`card shadow p-4 mb-4 ${
    darkMode ? "bg-secondary text-white" : ""
  }`}
>

      <h3 className="text-center mb-4">
            {selectedEmployee ? "Update Employee" : "Add Employee"}
      </h3>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <input
            type="text"
            name="name"
            placeholder="Employee Name"
            className={`form-control ${
            darkMode ? "bg-dark text-white border-light" : ""
            }`}
            value={employee.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={`form-control ${
            darkMode ? "bg-dark text-white border-light" : ""
            }`}
            value={employee.email}
            onChange={handleChange}
          />
        </div>
        
        <div className="mb-3">
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className={`form-control ${
            darkMode ? "bg-dark text-white border-light" : ""
            }`}
            value={employee.phone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="department"
            placeholder="Department"
            className={`form-control ${
            darkMode ? "bg-dark text-white border-light" : ""
            }`}
            value={employee.department}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="position"
            placeholder="Position"
            className={`form-control ${
            darkMode ? "bg-dark text-white border-light" : ""
            }`}
            value={employee.position}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            className={`form-control ${
            darkMode ? "bg-dark text-white border-light" : ""
            }`}
            value={employee.salary}
            onChange={handleChange}
          />
        </div>

       <button
            className="btn btn-primary w-100"
            type="submit"
            disabled={loading}
         >
           {loading
               ? "Saving..."
               : selectedEmployee
               ? "Update Employee"
               : "Add Employee"}
        </button>

      </form>

    </div>
  );
}

export default EmployeeForm;