const express = require("express")
const shiftService = require("../Services/shiftService")
const {protect} = require("../Middlewares/autoMiddleware")
const { actionsMiddleware } = require("../Middlewares/actionsMiddleare")

const router = express.Router()

router.get("/", protect, actionsMiddleware, async(req,res)=>{
 try{
    const getAllShift= await shiftService.getAllShift()
    console.log("getAllShift:", getAllShift)
    return res.status(200).json({message: "shifts retrieved successfully", data: getAllShift})
 }
 catch(err){
    console.log("getallSift err:", err)
    return res.status(400).json({message: $`err:${err}`,sucsees: false})
    }
})

router.get("/:id", protect, async(req,res)=>{
    const id = req.params.id
    console.log("getShiftById:", id)
    const shift = await shiftService.getShiftById(id)
    return res.status(200).json({message: "shift retrieved successfully", data: shift})
})
/*Create new department */
router.post("/",protect, actionsMiddleware, async(req,res)=>{
    const shiftData = req.body
    try{
        const status = await shiftService.createNewShift(shiftData)
        return res.status(200).json({message: status, sucsees: true})
    }
    catch(err)
    {
        return res.status(400).json({message: `Was error in created new shift: ${err}`, sucsees: false})
    }
})

/*update Shift*/
router.put("/:id",protect,actionsMiddleware ,async(req,res)=>{
    const newShift = req.body
    const id = req.params.id
    console.log("updateShift:", newShift, "id:",id)
    try{
        const status = await shiftService.updateShift(id,newShift)
        return res.status(200).json({message: status, sucsees: true})
    }
    catch(err)
    {
        return res.status(400).json({message: `was error in updated shift: ${err}`, sucsees: false})
    }
})


module.exports = router;