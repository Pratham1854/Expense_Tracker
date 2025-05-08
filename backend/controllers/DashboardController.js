const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

exports.getDashbarddata = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    // Fetch total income
    const totalIncome = await Income.aggregate([
      { $match: { userid: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Fetch total expense
    const totalExpense = await Expense.aggregate([
      { $match: { userid: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Last 60 days income
    const incomeLast60DaysTransactions = await Income.find({
      userid: userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const incomeLast60DaysTotal = incomeLast60DaysTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // Last 30 days expenses
    const expenseLast30DaysTransactions = await Expense.find({
      userid: userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const expenseLast30DaysTotal = expenseLast30DaysTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // Recent Transactions
    const recentTransactions = [
      ...(await Income.find({ userid: userId })
        .sort({ date: -1 })
        .limit(5)
        .then((txns) =>
          txns.map((txn) => ({
            ...txn.toObject(),
            type: "income",
          }))
        )),
      ...(await Expense.find({ userid: userId })
        .sort({ date: -1 })
        .limit(5)
        .then((txns) =>
          txns.map((txn) => ({
            ...txn.toObject(),
            type: "expense",
          }))
        )),
    ].sort((a, b) => b.date - a.date);

    res.json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last30DaysExpenses: {
        total: expenseLast30DaysTotal,
        transactions: expenseLast30DaysTransactions,
      },
      last60DaysIncome: {
        total: incomeLast60DaysTotal,
        transactions: incomeLast60DaysTransactions,
      },
      recentTransactions,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
