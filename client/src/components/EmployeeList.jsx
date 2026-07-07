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




function EmployeeList({
  refresh,
  setRefresh,
  setSelectedEmployee,
  darkMode,
}) {

const getAvatarColor = (name) => {
    const colors = [
      "#2563eb",
      "#16a34a",
      "#9333ea",
      "#ea580c",
      "#dc2626",
      "#0891b2",
      "#ca8a04",
      "#4f46e5",
    ];

    return colors[name.charCodeAt(0) % colors.length];
  };



  const [viewEmployee, setViewEmployee] = useState(null);
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
  console.log("fetchEmployees called");




  try {
    const data = await getEmployees();

    console.log("API Response:", data);

    setEmployees(data.data);
  } catch (error) {
    console.log("API Error:", error.response);
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

// Table update
fetchEmployees();

// Dashboard update
setRefresh((prev) => !prev);

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
  Gender: emp.gender,
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
      "Gender",
      "Salary",
    ]],

    body: filteredEmployees.map((emp) => [
      emp.name,
      emp.email,
      emp.phone,
      emp.department,
      emp.position,
      emp.gender,
      `₹ ${emp.salary}`,
    ]),
  });

  doc.save("Employees.pdf");
};



  

  return (
    <div className="container-fluid px-4 py-4">

      <div
  className={`card border-0 shadow-lg rounded-4 ${
    darkMode ? "bg-secondary text-white" : ""
  }`}
>

      
       <div className="card-header bg-white border-0 py-3">
  <div className="d-flex justify-content-between align-items-center">

    <h3 className="fw-bold mb-0 text-dark">
      👥 Employee List
    </h3>

    <div className="d-flex gap-2">

      <button
        className="btn btn-success"
        onClick={exportToExcel}
      >
        📗 Excel
      </button>

      <button
        className="btn btn-danger"
        onClick={exportToPDF}
      >
        📄 PDF
      </button>

    </div>

  </div>
</div>
<div
  className={`card-body ${
    darkMode ? "bg-secondary text-white" : ""
  }`}
></div>
        <div className="row mb-4">

  <div className="col-md-4">
    <input
      type="text"
      className={`form-control ${
        darkMode ? "bg-dark text-white border-light" : ""
      }`}
      placeholder="🔍 Search Employee..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>

  <div className="col-md-4">
    <select
      className={`form-select ${
        darkMode ? "bg-dark text-white border-light" : ""
      }`}
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

  <div className="col-md-4">
    <select
      className={`form-select ${
        darkMode ? "bg-dark text-white border-light" : ""
      }`}
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
    >
      <option value="">Sort By</option>
      <option value="name">Name (A-Z)</option>
      <option value="salaryLow">Salary Low → High</option>
      <option value="salaryHigh">Salary High → Low</option>
    </select>
  </div>

</div>


{viewEmployee && (
  <div
    className="modal fade show"
    style={{
      display: "block",
      backgroundColor: "rgba(0,0,0,0.5)",
    }}
  >
    <div className="modal-dialog modal-lg modal-dialog-centered">
      <div className="modal-content">

        <div className="modal-header">
          <h4 className="modal-title">
            👤 Employee Details
          </h4>

          <button
            className="btn-close"
            onClick={() => setViewEmployee(null)}
          ></button>
        </div>

        <div className="modal-body">

          <div className="row">

           

  <div className="col-md-4 text-center border-end">

  {
  viewEmployee.photo ? (

    <img
      src={`http://localhost:5000/uploads/${viewEmployee.photo}`}
      className="rounded-circle shadow"
      style={{
        width: "170px",
        height: "170px",
        objectFit: "cover",
      }}
      alt={viewEmployee.name}
    />

  ) : (

    <div
      className="rounded-circle shadow d-flex align-items-center justify-content-center text-white fw-bold"
      style={{
        width: "170px",
        height: "170px",
        margin: "0 auto",
        background: getAvatarColor(viewEmployee.name),
        fontSize: "70px",
      }}
    >
      {viewEmployee.name.charAt(0).toUpperCase()}
    </div>

  )
}

  <h4 className="mt-3 fw-bold">
    {viewEmployee.name}
  </h4>

  <p className="text-muted mb-2">
    {viewEmployee.position}
  </p>

  <span className="badge bg-primary fs-6 px-3 py-2">
    {viewEmployee.department}
  </span>

</div>

            <div className="col-md-8">

              <table className="table">

                <tbody>

                  <tr>
                    <th>Name</th>
                    <td>{viewEmployee.name}</td>
                  </tr>

                  <tr>
                    <th>Email</th>
                    <td>{viewEmployee.email}</td>
                  </tr>

                  <tr>
                    <th>Phone</th>
                    <td>{viewEmployee.phone}</td>
                  </tr>

                  

                  <tr>
                    <th>Gender</th>
                    <td>
                       <span className={`badge ${
                      viewEmployee.gender === "Male"
                     ? "bg-primary"
                    : "bg-danger"
                 }`}
                  >
                 {viewEmployee.gender}
              </span>
             </td>
             </tr>


                   <tr>
                     <th>Joining Date</th>
                   <td>
                    {new Date(viewEmployee.createdAt).toLocaleDateString()}
                  </td>
               </tr>

                 

                  <tr>
                    <th>Salary</th>
                    <td>
                    <span className="badge bg-success fs-6">
                    ₹ {Number(viewEmployee.salary).toLocaleString("en-IN")}
                   </span>
                  </td>
                  </tr>

                </tbody>

              </table>

            </div>

          </div>

        </div>

        <div className="modal-footer">

          <button
            className="btn btn-secondary"
            onClick={() => setViewEmployee(null)}
          >
            Close
          </button>

        </div>

      </div>
    </div>
  </div>
)}


          {/* Table */}
          <div className="table-responsive">
  <table
    className={`table table-hover align-middle text-center mb-0 ${
      darkMode ? "table-dark" : ""
    }`}
  >
          
            <thead className={darkMode ? "table-dark" : "table-primary"}>
              <tr>
                <th>Sr No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Position</th>
                <th>Gender</th>
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

                    <td>{employee.gender}</td>

                    
                   <td>₹ {employee.salary} </td>

                    <td>

<button
  className="btn btn-info btn-sm me-2"
  onClick={() => setViewEmployee(employee)}
>
  View
</button>



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
                  <td colSpan="8">No Employees Found</td>
                </tr>
              )}
            </tbody>

          </table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-4">

  <button
    className="btn btn-outline-primary rounded-pill px-4"
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
  >
    ← Previous
  </button>

  <span className="fw-semibold">
    Page {currentPage} of {totalPages}
  </span>

  <button
    className="btn btn-outline-primary rounded-pill px-4"
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(currentPage + 1)}
  >
    Next →
  </button>

</div>
        </div>

      </div>

    
  );
}

export default EmployeeList;

