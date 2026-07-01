import { useEffect, useState } from "react";
import {
  getEmployees,
  deleteEmployee,
} from "../services/employeeService";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";




function EmployeeList({ refresh, setSelectedEmployee }) {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [sortBy, setSortBy] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
const employeesPerPage = 5;

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
  const filteredEmployees = employees.filter((employee) => {

  const matchName =
    employee.name.toLowerCase().includes(search.toLowerCase());

  const matchDepartment =
    departmentFilter === "All" ||
    employee.department === departmentFilter;

  return matchName && matchDepartment;

});


const sortedEmployees = [...filteredEmployees];

if (sortBy === "name") {
  sortedEmployees.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

if (sortBy === "salaryLow") {
  sortedEmployees.sort(
    (a, b) => a.salary - b.salary
  );
}

if (sortBy === "salaryHigh") {
  sortedEmployees.sort(
    (a, b) => b.salary - a.salary
  );
}

// Pagination
const indexOfLastEmployee = currentPage * employeesPerPage;
const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;

const currentEmployees = sortedEmployees.slice(
  indexOfFirstEmployee,
  indexOfLastEmployee
);
const totalPages = Math.ceil(
  sortedEmployees.length / employeesPerPage
);

const exportToExcel = () => {
  const data = filteredEmployees.map((emp) => ({
    Name: emp.name,
    Email: emp.email,
    Phone: emp.phone,
    Department: emp.department,
    Position: emp.position,
    Salary: emp.salary,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const fileData = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(fileData, "Employees.xlsx");
};

const exportToPDF = () => {

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Employee Management System", 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [[
      "Name",
      "Email",
      "Phone",
      "Department",
      "Position",
      "Salary"
    ]],

    body: filteredEmployees.map((emp) => [
      emp.name,
      emp.email,
      emp.phone,
      emp.department,
      emp.position,
      `Rs. ${emp.salary}`,
    ]),
  });

  doc.save("Employees.pdf");
};



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

<div className="mb-3">
  <select
    className="form-select"
    value={departmentFilter}
    onChange={(e) => setDepartmentFilter(e.target.value)}
  >
    <option value="All">All Departments</option>
    <option value="IT">IT</option>
    <option value="HR">HR</option>
    <option value="Marketing">Marketing</option>
    <option value="Sales">Sales</option>
  </select>
</div>

<div className="mb-3">
  <select
    className="form-select"
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
  >
    <option value="">Sort By</option>
    <option value="name">Name (A-Z)</option>
    <option value="salaryLow">Salary (Low to High)</option>
    <option value="salaryHigh">Salary (High to Low)</option>
  </select>
</div>

    
 <div className="mb-3 d-flex justify-content-end gap-2">

  <button
    className="btn btn-success"
    onClick={exportToExcel}
  >
    📗 Export Excel
  </button>

  <button
    className="btn btn-danger"
    onClick={exportToPDF}
  >
    📄 Export PDF
  </button>

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
              {currentEmployees.length > 0 ? (
                currentEmployees.map((employee, index) => (
                  <tr key={employee._id}>

                   <td>{indexOfFirstEmployee + index + 1}</td>

                    <td>{employee.name}</td>

                    <td>{employee.email}</td>

                    <td>{employee.department}</td>

                    <td>{employee.position}</td>

                    <td>₹ {employee.salary} </td>

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

          <div className="d-flex justify-content-center mt-3">

  <button
    className="btn btn-secondary me-2"
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
  >
    Previous
  </button>

  <span className="align-self-center fw-bold">
    Page {currentPage} of {totalPages}
  </span>

  <button
    className="btn btn-secondary ms-2"
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(currentPage + 1)}
  >
    Next
  </button>

</div>

        </div>

      </div>

    </div>
  );
}

export default EmployeeList;