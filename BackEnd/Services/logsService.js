const jsonFile = require("jsonfile")
const path = require("path")

const getLogs = ()=>{
     const url = path.join (__dirname, "../Data/logs.json")
     const logs = jsonFile.readFile(url)
     return logs;
}

module.exports = {getLogs}