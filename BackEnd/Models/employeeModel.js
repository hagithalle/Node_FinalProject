const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please add a first name"]
  },
  lastName: {
    type: String,
    required: [true, "Please add a last name"]
  },
  startWork: {
    type: Number,
    required: [true, "Please add a start work year"]
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: false
  },
  shifts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shift"
    }
  ]
});

module.exports = mongoose.model("Employee", employeeSchema);