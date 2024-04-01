require("express-async-errors");

const express = require("express");
const app = express();

//Security and resource sharing packages
const cors = require("cors");
const xss = require("xss-clean");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");

//Import routes handlers and middlewares
const expenseRouter = require("./routes/expenses");
const authRouter = require("./routes/auth");
const connectDB = require("./connect");
const authenticateUser = require("./middleware/authenticate");
const notFoundMiddleWare = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");
require("dotenv").config();

//Middlewares
app.use(
  rateLimit({
    windowMs: 15 * 60 * 60,
    limit: 100,
  })
);
app.use(helmet());
app.use(xss());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Route and Error Handlers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/expenses", authenticateUser, expenseRouter);
// app.use("/api/v1/populate", popRoute);
app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleware);

//Connection to the database and spin up server.
const start = async () => {
  console.log(`Starting application...\nConnecting to database...`);
  await connectDB(process.env.MONGO_URI, process.env.DB_NAME);
  console.log("Connection successful");

  console.log("Spinning up server...");
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
  });
};

start();
