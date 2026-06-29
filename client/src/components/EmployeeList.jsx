import { useEffect, useState } from "react";
import {getEmployees,
  deleteEmployee,
} from "../services/employeeService";

function EmployeeList({ refresh }) {
  const [employees, setEmployees] = useState([]);

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
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this employee?"
  );

  if (!confirmDelete) return;

  try {
    await deleteEmployee(id);

    alert("Employee Deleted Successfully");

    fetchEmployees();
  } catch (error) {
    console.log(error);
  }
};



  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Employee List</h3>
        </div>

        <div className="card-body">
          <table className="table table-bordered table-hover text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Position</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <tr key={employee._id}>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.department}</td>
                    <td>{employee.position}</td>
                    <td>₹ {employee.salary}</td>
                    <td>
                      <button className="btn btn-warning btn-sm me-2">
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
                  <td colSpan="6">No Employees Found</td>
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