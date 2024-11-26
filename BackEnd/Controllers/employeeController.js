const express = require("express")
const employeeService = require("../Services/employeeService")
const {protect} = require("../Middlewares/autoMiddleware")
const { actionsMiddleware } = require("../Middlewares/actionsMiddleare")

const router = express.Router()

router.get("/", protect, actionsMiddleware, async(req,res)=>{
      console.log("getAll employee")
    const getAllEmployees = await employeeService.getAllEmployees()
    console.log("getAllEmployees: ", getAllEmployees)
    return res.status(200).json({message: "employees retrieved successfully", data: getAllEmployees})
})

router.get("/:id", protect, async(req,res)=>{
    const id = req.params.id
    const employee = await employeeService.getEmployeeById(id)
    return res.status(200).json({message: "employee retrieved successfully", data: employee})
})
/*Create new employee */
router.post("/",protect, actionsMiddleware, async(req,res)=>{
    const employeeData = req.body
   
    try{
        const status = await employeeService.createNewEmployee(employeeData)
        return res.status(200).json({message: status, sucsees: true})
    }
    catch(err)
    {
        return res.status(400).json({message: `Was error in crate new employee: ${err}`, sucsees: false})
    }
})

/*Update employee*/
router.put("/:id",protect,actionsMiddleware ,async(req,res)=>{
    const newEmployee = req.body
    const id = req.params.id
    console.log("Update employee:",newEmployee, id)
    try{
        const status = await employeeService.updateEmployee(id,newEmployee)
        console.log("Update employee status:", status)
        return res.status(200).json({message: status, sucsees: true})
    }
    catch(err)
    {
        return res.status(400).json({message: `was error in update employee: ${err}`, sucsees: false})
    }
})

/*deleted employee*/
router.delete("/:id",protect,actionsMiddleware ,async(req,res)=>{
    const id = req.params.id
    try{
        const status = await employeeService.deletedEmployee(id)
        return res.status(200).json({message: status, sucsees: true})
    }
    catch(err)
    {
        return res.status(400).json({message: `was error in deleted employee: ${err}`, sucsees: false})
    }
})

router.put("/:id/Shift",protect,actionsMiddleware ,async(req,res)=>{
    
    const id = req.params.id
    const {shiftId} = req.body

    console.log(req.body)
    
    try{
        console.log("update shift req.params id:",id, "shiftId: ", shiftId)
        const status = await employeeService.addShiftToEmployee(id, shiftId)
        return res.status(200).json({message: status, sucsees: true})
    }
    catch(err)
    {
        return res.status(400).json({message: `was error in add shift to employee: ${err}`, sucsees: false})
    }
})

router.delete("/:id/Shift",protect,actionsMiddleware ,async(req,res)=>{
    try{
        console.log("delet shift req.params:", req.params)
        const status = await employeeService.deleteShiftFromEmployee(req.params)
        return res.status(200).json({message: status, sucsees: true})
    }
    catch(err)
    {
        return res.status(400).json({message: `was error in deleted shift to employee: ${err}`, sucsees: false})
    }
})





module.exports = router;