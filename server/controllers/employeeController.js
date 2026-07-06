const Employee = require("../models/Employee");

// Create Employee
const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);

    res.status(201).json({
      success: true,
      message: "Employee Created Successfully",
      data: employee,
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Employee with this email already exists.",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();

    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Employee
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Employee
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee Updated Successfully",
      data: employee,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Employee with this email already exists.",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Dashboard Statistics
const getDashboardStats = async (req, res) => {
  try {
    const employees = await Employee.find();

    const totalEmployees = employees.length;

    const maleEmployees = employees.filter(
      (emp) => emp.gender?.toLowerCase() === "male"
    ).length;

    const femaleEmployees = employees.filter(
      (emp) => emp.gender?.toLowerCase() === "female"
    ).length;

    const departments = [
      ...new Set(
        employees
          .map((emp) => emp.department)
          .filter(Boolean)
      ),
    ].length;

    res.status(200).json({
      success: true,
      data: {
        totalEmployees,
        maleEmployees,
        femaleEmployees,
        departments,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Export Controllers
module.exports = {
  createEmployee,
  getAllEmployees,
  deleteEmployee,
  updateEmployee,
  getDashboardStats,
};