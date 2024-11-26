const express = require("express")
const departmentService = require("../Services/departmentService")
const {protect} = require("../Middlewares/autoMiddleware")
const { actionsMiddleware } = require("../Middlewares/actionsMiddleare")

const router = express.Router()

router.get("/", protect, actionsMiddleware, async(req,res)=>{
    console.log("getAll department")
    const getAllDepartment = await departmentService.getAllDepartment()
    console.log("getAllDepartment: ", getAllDepartment)
    return res.status(200).json({message: "departments retrieved successfully", data: getAllDepartment})
})

router.get("/:id", protect, async(req,res)=>{
    const id = req.params.id
    const department = await departmentService.getDepartmentById(id)
    return res.status(200).json({message: "department retrieved successfully", data: department})
})
/*Create new department */
router.post("/",protect, actionsMiddleware, async(req,res)=>{
    const departmentData = req.body
    console.log("departmentData: ", departmentData)
    try{
        const status = await departmentService.createNewDepartment(departmentData)
        console.log("create department status:" ,status)
        return res.status(200).json({message: status, sucsees: true})
    }
    catch(err)
    {
        console.log("err", err)
        return res.status(400).json({message: `Was error in created new department: ${err}`, sucsees: false})
    }
})

/*Update department*/
router.put("/:id",protect,actionsMiddleware ,async(req,res)=>{
    const newDepartment = req.body
    const id = req.params.id

    console.log("newDepartment:", newDepartment, "id:", id)
    try{
        const status = await departmentService.updateDepartment(id,newDepartment)
        console.log("update department status:" ,status)
        return res.status(200).json({message: status, sucsees: true})
    }
    catch(err)
    {
        console.log("err", err)
        return res.status(400).json({message: `was error in updated department: ${err}`, sucsees: false})
    }
})

/*deleted department*/
router.delete("/:id",protect,actionsMiddleware ,async(req,res)=>{
    const id = req.params.id
    try{
        const status = await departmentService.deletedDepartment(id)
        return res.status(200).json({message: status, sucsees: true})
    }
    catch(err)
    {
        return res.status(400).json({message: `was error in deleted department: ${err}`, sucsees: false})
    }
})

module.exports = router;