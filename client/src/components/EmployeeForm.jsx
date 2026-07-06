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
    gender: "",
    salary: "",
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
        gender: "",
        salary: "",
      });
    }
  }, [selectedEmployee]);

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !employee.name ||
      !employee.email ||
      !employee.phone ||
      !employee.department ||
      !employee.position ||
      !employee.gender ||
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
        gender: "",
        salary: "",
      });

      setSelectedEmployee(null);
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div
      className={`card shadow-lg border-0 rounded-4 mb-5 ${
        darkMode ? "bg-secondary text-white" : ""
      }`}
    >
      <div className="card-body p-4">
        <h2 className="text-center fw-bold mb-4">
          {selectedEmployee ? "Update Employee" : "Add Employee"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
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

            <div className="col-md-6 mb-3">
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

            <div className="col-md-6 mb-3">
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

            <div className="col-md-6 mb-3">
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

            <div className="col-md-6 mb-3">
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

            <div className="col-md-6 mb-3">
              <select
                name="gender"
                className={`form-select ${
                  darkMode ? "bg-dark text-white border-light" : ""
                }`}
                value={employee.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="col-md-12 mb-4">
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
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-100 py-2 fw-bold"
          >
            {loading
              ? "Saving..."
              : selectedEmployee
              ? "Update Employee"
              : "Add Employee"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;