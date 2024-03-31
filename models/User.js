const mongoose = require("mongoose");
const { isStrongPassword } = require("validator");
const jwt = require("jsonwebtoken");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");

/*

  Avoid using commas(,) in the validation error responses since the error
  handler middleware depends on splitting duplicate validation errors on commas
  
*/

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    required: [true, "Please provide a username"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: [6, "Password must be at least 6 characters long"],
    validate: {
      validator: (value) => isStrongPassword(value),
      message: "Please provide a strong password",
    },
  },
});

UserSchema.plugin(uniqueValidator, {
  message: "Username is already taken",
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      userId: this._id,
      name: this.username,
    },
    process.env.JWT_SECRET_PHRASE,
    {
      expiresIn: "30d",
    }
  );
};

UserSchema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
