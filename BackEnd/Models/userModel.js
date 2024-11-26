const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userId:{ 
        type: Number, 
             require: true
            },
            fullName:{
                type: String,
                require: [true," Please add full name"]
            },
            email:{
                type: String,
                require: [true," Please add a email"]
            },
            userName:{
                type: String,
                require: [true," Please add a userName"]
            },
            numOfActions:{
                    type: Number,
                    require: [true," Please add a number of actions"]
            },
            actionsAllowed:{
                    type: Number,
                    require: true
            }
});

module.exports= mongoose.model("User", userSchema)