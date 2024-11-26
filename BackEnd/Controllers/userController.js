const express = require("express")
const userService = require("../Services/userService")
const {protect} = require("../Middlewares/autoMiddleware")
const { actionsMiddleware } = require("../Middlewares/actionsMiddleare")

const router = express.Router()

router.get("/", protect, actionsMiddleware, async(req,res)=>{
    const getAllUsers = await userService.getAllUsers()
    return res.status(200).json({message: "Users  retrieved successfully", data: getAllUsers})
})

router.get("/init", async(req,res)=>{
    console.log("init")
    const status = await userService.initData();
    return res.status(200).json(status)
})

router.post("/login", async(req,res)=>{
    const {userName, email} = req.body
    console.log("login: ")
    console.log("login: ", req.body)
    const status = await userService.checkUserLogin(email,userName)
console.log(status)
    if(status.token)
        return res.status(200).json({message: "User login successfully", data: status})
    else
    return res.status(400).json({message: status})
})

module.exports = router;