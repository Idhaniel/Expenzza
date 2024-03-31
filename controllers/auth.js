const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError, BadRequestError } = require("../errors");

const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("Please provide a username and password");
  }
  const user = await User.create(req.body);
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    success: true,
    user: { name: user.username, userId: user._id },
    token,
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("Please provide a username and password");
  }
  const user = await User.findOne({ username });
  if (!user) {
    throw new UnauthenticatedError(
      `No user with a username of ${username} exist. Do you wish to register new?`
    );
  }
  const isPassword = await user.verifyPassword(password); // DON'T FORGET TO AWAIT!!!!
  if (!isPassword) {
    throw new UnauthenticatedError("Wrong password");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    success: true,
    user: { name: user.username, userId: user._id },
    token,
  });
};

module.exports = { register, login };
