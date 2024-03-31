const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong",
  };
  if (err.name === "ValidationError") {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",")
      .split(",");
  }

  if (err.name === "CastError") {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.msg = `No expense with an id ${err.value}`;
  }

  return res
    .status(customError.statusCode)
    .json({ success: false, msg: [customError.msg].flat() }); //Flat to reduce the dimensionality of the array to 1D especially useful in a validation or cast error.
};
module.exports = errorHandlerMiddleware;
