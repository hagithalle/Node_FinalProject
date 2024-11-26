const shiftRepo = require("../Repositories/shiftRepo")

const getAllShift=()=>{
    return shiftRepo.getAllShift()
}

const getShiftById= (id)=>{

    return shiftRepo.getShiftById(id);
}

const createNewShift= (shiftData)=>{
    return shiftRepo.createNewShift(shiftData)

}

const updateShift=(id, shiftData)=>{

    return shiftRepo.updateShift(id,shiftData)
}

    

module.exports = {
           getAllShift,
           getShiftById,
           createNewShift,
           updateShift

}
   