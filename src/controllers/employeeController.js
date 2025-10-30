// controllers/EmployeeController.js
const { Employee, Station } = require("../models");
console.log("Employee type:", typeof Employee, "Station type:", typeof Station);

// Create new employee
exports.createEmployee = async (req, res) => {
  try {
    const {
      name,
      contactNumber,
      address,
      monthlySalary,
      currentAdvanceAmount,
      advanceDate,
      totalLoanAmount,
      remainingLoanAmount,
      monthlyInstallmentAmount,
      loanStartDate,
      loanEndDate,
      stationId,
    } = req.body;

    const employee = await Employee.create({
      name,
      contactNumber,
      address,
      monthlySalary,
      currentAdvanceAmount: currentAdvanceAmount || 0,
      advanceDate: advanceDate || null,
      totalLoanAmount: totalLoanAmount || 0,
      remainingLoanAmount: remainingLoanAmount || 0,
      monthlyInstallmentAmount: monthlyInstallmentAmount || 0,
      loanStartDate: loanStartDate || null,
      loanEndDate: loanEndDate || null,
      stationId,
    });

    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({
      message: "Error creating employee",
      error: err.message,
    });
  }
};

// Get all employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      include: [{ model: Station, attributes: ["id", "name", "location"] }],
      order: [["id", "DESC"]],
    });

    res.json(employees);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching employees",
      error: err.message,
    });
  }
};

// Get employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id, {
      include: [{ model: Station, attributes: ["id", "name", "location"] }],
    });

    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    res.json(employee);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching employee",
      error: err.message,
    });
  }
};

// Update employee
exports.updateEmployee = async (req, res) => {
  try {
    const {
      name,
      contactNumber,
      address,
      monthlySalary,
      currentAdvanceAmount,
      advanceDate,
      totalLoanAmount,
      remainingLoanAmount,
      monthlyInstallmentAmount,
      loanStartDate,
      loanEndDate,
      stationId,
    } = req.body;

    const employee = await Employee.findByPk(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    employee.name = name || employee.name;
    employee.contactNumber = contactNumber || employee.contactNumber;
    employee.address = address || employee.address;
    employee.monthlySalary =
      monthlySalary !== undefined ? monthlySalary : employee.monthlySalary;

    employee.currentAdvanceAmount =
      currentAdvanceAmount !== undefined
        ? currentAdvanceAmount
        : employee.currentAdvanceAmount;
    employee.advanceDate = advanceDate || employee.advanceDate;

    employee.totalLoanAmount =
      totalLoanAmount !== undefined
        ? totalLoanAmount
        : employee.totalLoanAmount;
    employee.remainingLoanAmount =
      remainingLoanAmount !== undefined
        ? remainingLoanAmount
        : employee.remainingLoanAmount;
    employee.monthlyInstallmentAmount =
      monthlyInstallmentAmount !== undefined
        ? monthlyInstallmentAmount
        : employee.monthlyInstallmentAmount;
    employee.loanStartDate = loanStartDate || employee.loanStartDate;
    employee.loanEndDate = loanEndDate || employee.loanEndDate;

    employee.stationId =
      stationId !== undefined ? stationId : employee.stationId;

    await employee.save();

    res.json(employee);
  } catch (err) {
    res.status(500).json({
      message: "Error updating employee",
      error: err.message,
    });
  }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    await employee.destroy();
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting employee",
      error: err.message,
    });
  }
};
