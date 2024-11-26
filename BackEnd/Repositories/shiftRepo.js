const shiftModel = require("../Models/shiftModel")

const getAllShift=()=>{
    return shiftModel.find({})
}
const getShiftById=(id)=>{
    return shiftModel.findById(id)
}

const createNewShift=async(shiftData)=>{
    const department = new shiftModel(shiftData)
    await department.save()
    return "Shift Created.."
}

const updateShift =async(id, shiftData)=>{
    await shiftModel.findByIdAndUpdate(id, shiftData)
     return "Shift updated..."
}


const deletedShift =async(id)=>{
    await shiftModel.findByIdAndDelete(id)
     return "Shift deleted..."
}

module.exports= {getAllShift,
                getShiftById,
                createNewShift,
                updateShift,
                deletedShift}