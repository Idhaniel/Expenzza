const Expense = require("../models/Expense");
const { StatusCodes } = require("http-status-codes");
const {
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("../errors");

const retrieveAllExpenses = async (req, res) => {
  //Just to doubly make sure the authentication middleware called before this route handling function has attached a user property to the request object

  if (!req.user) {
    throw new UnauthenticatedError("Authentication failed");
  }

  //and also make sure the userId is attached to req.user

  const { userId } = req.user;

  if (!userId) {
    throw new UnauthenticatedError("Invalid user");
  }

  const expenses = await Expense.find({ createdBy: userId })
    .sort("createdAt")
    .select("-updatedAt -createdBy");

  res
    .status(StatusCodes.OK)
    .json({ success: true, expenses, count: expenses.length });
};

const retrieveExpense = async (req, res) => {
  if (!req.user) {
    throw new UnauthenticatedError("Authentication failed");
  }

  const {
    user: { userId },
    params: { id: expenseId },
  } = req;

  if (!userId) {
    throw new UnauthenticatedError("Invalid user");
  }

  const expense = await Expense.findOne({
    _id: expenseId,
    createdBy: userId,
  }).select("-updatedAt -createdBy");

  if (!expense) {
    throw new NotFoundError(`No expense with an id ${req.params.id}`);
  }

  res.status(StatusCodes.OK).json({ success: true, expense });
};

const recordExpense = async (req, res) => {
  if (!req.user) {
    throw new UnauthenticatedError("Authentication failed");
  }
  if (!req.body) {
    throw new BadRequestError("Fill valid details");
  }

  //Although i could trust mongoose validators that req.body exists and infacts has the appropriate data as needed by the schema, just felt like making an extra check even though these errors will probably never get through

  const {
    user: { userId },
    body: { amount, description, category },
  } = req;

  if (!userId) {
    throw new UnauthenticatedError("Invalid user");
  }

  req.body.createdBy = userId;
  const expense = await Expense.create({
    amount,
    description,
    category,
    createdBy: req.body.createdBy,
  });
  // const expense = await Expense.create(req.body);
  res.status(StatusCodes.CREATED).json({ success: true });
};

module.exports = {
  retrieveAllExpenses,
  retrieveExpense,
  recordExpense,
};
