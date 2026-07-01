import { useEffect, useState } from "react";
import {
  getEmployees,
  deleteEmployee,
} from "../services/employeeService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function EmployeeList({ refresh, setSelectedEmployee }) {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, [refresh]);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {

  const result = await Swal.fire({
    title: "Delete Employee?",
    text: "You won't be able to recover this employee!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc3545",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, Delete",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {
    await deleteEmployee(id);

    toast.success("Employee Deleted Successfully");

    fetchEmployees();

  } catch (error) {
    console.log(error);

    toast.error("Delete Failed!");
  }
};

  // Search Filter
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );

  // Dashboard Data
  const totalEmployees = employees.length;

  const itEmployees = employees.filter(
    (emp) => emp.department.toLowerCase() === "it"
  ).length;

  const hrEmployees = employees.filter(
    (emp) => emp.department.toLowerCase() === "hr"
  ).length;

  const totalSalary = employees.reduce(
    (total, emp) => total + Number(emp.salary),
    0
  );

  return (
    <div className="container mt-5">

      {/* Dashboard Cards */}
      <div className="row mb-4">

        <div className="col-md-3">
          <div className="card text-center shadow border-0 bg-primary text-white">
            <div className="card-body">
              <h5>Total Employees</h5>
              <h2>{totalEmployees}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow border-0 bg-success text-white">
            <div className="card-body">
              <h5>IT Department</h5>
              <h2>{itEmployees}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow border-0 bg-warning">
            <div className="card-body">
              <h5>HR Department</h5>
              <h2>{hrEmployees}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow border-0 bg-info text-white">
            <div className="card-body">
              <h5>Total Salary</h5>
              <h5>₹ {totalSalary}</h5>
            </div>
          </div>
        </div>

      </div>

      {/* Employee List */}
      <div className="card shadow">

        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Employee List</h3>
        </div>

        <div className="card-body">

          {/* Search Box */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search Employee by Name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Table */}
          <table className="table table-bordered table-hover text-center align-middle">

            <thead className="table-dark">
              <tr>
                <th>Sr No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Position</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee, index) => (
                  <tr key={employee._id}>

                    <td>{index + 1}</td>

                    <td>{employee.name}</td>

                    <td>{employee.email}</td>

                    <td>{employee.department}</td>

                    <td>{employee.position}</td>

                    <td>₹ {employee.salary}</td>

                    <td>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => setSelectedEmployee(employee)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(employee._id)}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No Employees Found</td>
                </tr>
              )}
            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default EmployeeList;