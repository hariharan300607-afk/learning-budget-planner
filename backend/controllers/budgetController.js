
const Budget = require("../models/Budget");

// GET the saved monthly budget
const getBudget = async (req, res) => {
  try {
    let budget = await Budget.findOne();

    if (!budget) {
      budget = await Budget.create({ monthlyBudget: 10000 });
    }

    res.status(200).json({
      success: true,
      data: budget,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve budget",
      error: error.message,
    });
  }
};

// UPDATE the monthly budget
const updateBudget = async (req, res) => {
  try {
    const monthlyBudget = Number(req.body.monthlyBudget);

    if (!Number.isFinite(monthlyBudget) || monthlyBudget <= 0) {
      return res.status(400).json({
        success: false,
        message: "Monthly budget must be greater than zero",
      });
    }

    let budget = await Budget.findOne();

    if (!budget) {
      budget = await Budget.create({ monthlyBudget });
    } else {
      budget.monthlyBudget = monthlyBudget;
      await budget.save();
    }

    res.status(200).json({
      success: true,
      data: budget,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update budget",
      error: error.message,
    });
  }
};

module.exports = {
  getBudget,
  updateBudget,
};
