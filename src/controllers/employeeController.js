// controllers/EmployeeController.js
const { Employee, Station } = require("../models");
console.log("Employee type:", typeof Employee, "Station type:", typeof Station);

// Create new employee
exports.createEmployee = async (req, res) => {
  try {
    const {
      name,
      designation,
      contactNumber,
      address,
      monthlySalary,
      monthlyallowance,
      advanceDate,
      totalLoanAmount,
      previousoutstanding,
      newoutstanding,
      balancepayablesalary,
      salarypaid,
      totalpaymentmade,
      loanStartDate,
      loanEndDate,
      stationId,
    } = req.body;

    const employee = await Employee.create({
      name,
      designation,
      contactNumber,
      address,
      monthlySalary,
      monthlyallowance: monthlyallowance || 0,
      advanceDate: advanceDate || null,
      totalLoanAmount: totalLoanAmount || 0,
      previousoutstanding: previousoutstanding || 0,
      newoutstanding: newoutstanding || 0,
      balancepayablesalary: balancepayablesalary || 0,
      salarypaid: salarypaid || 0,
      totalpaymentmade: totalpaymentmade || 0,
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
      designation,
      contactNumber,
      address,
      monthlySalary,
      monthlyallowance,
      advanceDate,
      totalLoanAmount,
      previousoutstanding,
      newoutstanding,
      balancepayablesalary,
      salarypaid,
      totalpaymentmade,
      loanStartDate,
      loanEndDate,
      stationId,
    } = req.body;

    const employee = await Employee.findByPk(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    employee.name = name || employee.name;
    employee.designation = designation || employee.designation;
    employee.contactNumber = contactNumber || employee.contactNumber;
    employee.address = address || employee.address;
    employee.monthlySalary =
      monthlySalary !== undefined ? monthlySalary : employee.monthlySalary;

    employee.monthlyallowance =
      monthlyallowance !== undefined
        ? monthlyallowance
        : employee.monthlyallowance;
    employee.advanceDate = advanceDate || employee.advanceDate;

    employee.totalLoanAmount =
      totalLoanAmount !== undefined
        ? totalLoanAmount
        : employee.totalLoanAmount;
    employee.previousoutstanding =
      previousoutstanding !== undefined
        ? previousoutstanding
        : employee.previousoutstanding;
    employee.newoutstanding =
      newoutstanding !== undefined ? newoutstanding : employee.newoutstanding;
    employee.balancepayablesalary =
      balancepayablesalary !== undefined
        ? balancepayablesalary
        : employee.balancepayablesalary;
    employee.salarypaid =
      salarypaid !== undefined ? salarypaid : employee.salarypaid;
    employee.totalpaymentmade =
      totalpaymentmade !== undefined
        ? totalpaymentmade
        : employee.totalpaymentmade;
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
