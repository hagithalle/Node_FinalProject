const mongoose = require("mongoose")

const departmentSchema = new mongoose.Schema({
    name:{
        type: String,
        require: [true, "Please add a department name"]
     },
     manager:{
        type: mongoose.Schema.Types.ObjectId,
        require: [false, "Please add a manager"]
     }
    })

module.exports= mongoose.model("Department", departmentSchema)