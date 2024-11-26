const mongoose = require("mongoose")

const shiftSchema = new mongoose.Schema({
    date:{
        type: Date,
        require: [true, "Please add a date"]
     },
     startingHour:{
        type: String,
        require: [false, "Please add a starting hour"]
     },
     endingHour:{
        type: String,
        require: [false, "Please add a ending hour"]
     }
    })

module.exports= mongoose.model("Shift", shiftSchema)