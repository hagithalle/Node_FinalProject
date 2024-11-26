const jsonfile = require("jsonfile")
const userService = require("../Services/userService")
const path= require("path")
const fs = require('fs').promises; // or 'fs' for callback version

const actionsMiddleware = async(req, res, next)=>{
    let status={};
    const user= req.user
  
    try {

        console.log("user: ", user)
        if(user.actionsAllowed>0){
            user.actionsAllowed -=1
            status = await userService.updateUser(user._id, user)

            const newLog={}
            newLog.id= user.userId;
            newLog.maxActions = user.numOfActions;
            newLog.date = new Date().toJSON().slice(0,10)
            newLog.actionsAllowed = user.actionsAllowed;

            console.log("newLog:", newLog)
            saveLogToJson(newLog)
        }
        else{
            console.log("Not actions access")
            return res.status(400).json({message: "Not actions access", success: false})
        }
    } catch (error) {
        console.log("error:", error)
        return res.status(400).json({message: `was error: ${error}`, success: false})
    }
    next()
}

const saveLogToJson = async (newLog) => {
    const file = path.join(__dirname, "../Data/logs.json");

    let logs;
    try {
        const data = await jsonfile.readFile(file);
        logs = data.actions || [];  // Extract existing logs
    } catch (error) {
        // Initialize `logs` if file is empty or malformed
        console.log("Error reading logs.json; initializing a new log array.", error);
        logs = [];
    }

    logs.push(newLog);  // Add the new log entry

    await jsonfile.writeFile(file, { actions: logs }, { spaces: 2 });
};

module.exports = {actionsMiddleware}

