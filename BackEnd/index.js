const express = require("express");
const cors = require("cors");
const cron = require("node-cron");

require("dotenv").config();
require("./Configs/database");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const { scheduleUpdateUserAction } = require("./Services/userService");

// Schedule cron job to update user actions at midnight every day
cron.schedule("0 0 * * *", () => {
  scheduleUpdateUserAction();
});

// Set up routes
app.use("/users", require("./Controllers/userController"));  // Correct controllers for routes
app.use("/employees", require("./Controllers/employeeController"));
app.use("/departments", require("./Controllers/departmentController"));
app.use("/shifts", require("./Controllers/shiftController"));
app.use("/logs", require("./Controllers/logsController"));

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://127.0.0.1:${port}`);
});