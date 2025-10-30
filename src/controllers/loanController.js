const Loan = require("../models/Loan");

// Create new loan
exports.createLoan = async (req, res) => {
  try {
    const {
      date,
      personName,
      amount,
      timePeriod,
      purpose,
      returnAmount,
      returnDate,
      remarks,
      loanType,
      status,
    } = req.body;

    const loan = await Loan.create({
      date,
      personName,
      amount,
      timePeriod,
      purpose,
      returnAmount,
      returnDate,
      remarks,
      loanType,
      status: status || "active",
    });

    res.status(201).json(loan);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating loan", error: err.message });
  }
};

// Get all loans
exports.getLoans = async (req, res) => {
  try {
    const loans = await Loan.findAll();
    res.json(loans);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching loans", error: err.message });
  }
};

// Get loan by ID
exports.getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findByPk(req.params.id);
    if (!loan) return res.status(404).json({ message: "Loan not found" });
    res.json(loan);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching loan", error: err.message });
  }
};

// Update loan
exports.updateLoan = async (req, res) => {
  try {
    const loan = await Loan.findByPk(req.params.id);
    if (!loan) return res.status(404).json({ message: "Loan not found" });

    const {
      date,
      personName,
      amount,
      timePeriod,
      purpose,
      returnAmount,
      returnDate,
      remarks,
      loanType,
      status,
    } = req.body;

    loan.date = date || loan.date;
    loan.personName = personName || loan.personName;
    loan.amount = amount ?? loan.amount;
    loan.timePeriod = timePeriod || loan.timePeriod;
    loan.purpose = purpose || loan.purpose;
    loan.returnAmount = returnAmount ?? loan.returnAmount;
    loan.returnDate = returnDate || loan.returnDate;
    loan.remarks = remarks || loan.remarks;
    loan.loanType = loanType || loan.loanType;
    loan.status = status || loan.status;

    await loan.save();
    res.json(loan);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating loan", error: err.message });
  }
};

// Delete loan
exports.deleteLoan = async (req, res) => {
  try {
    const loan = await Loan.findByPk(req.params.id);
    if (!loan) return res.status(404).json({ message: "Loan not found" });

    await loan.destroy();
    res.json({ message: "Loan deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting loan", error: err.message });
  }
};
