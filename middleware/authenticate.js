const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  //Use Bearer schema for authentication as standardized in the OAuth2.0 specification
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Invalid Authentication");
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET_PHRASE, (err, decoded) => {
    if (err) {
      throw new UnauthenticatedError("Invalid token");
    }
    req.user = decoded;
    next();
  });
};

module.exports = auth;
