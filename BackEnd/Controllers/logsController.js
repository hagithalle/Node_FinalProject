const express = require("express")
const {getLogs} = require("../Services/logsService")

const router = express.Router()

router.get("/", async(req,res)=>{
    const {actions: logs} = await getLogs();
    return res.json({message: "Success", logs})
})

module.exports = router;