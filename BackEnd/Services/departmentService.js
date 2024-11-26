const departmentRepo = require("../Repositories/departmentRepo")

const getAllDepartment=()=>{
    return departmentRepo.getAllDepartment()
}

const getDepartmentById= (id)=>{

    return departmentRepo.getDepartmentById(id);
}

const createNewDepartment= (employeeData)=>{
    return departmentRepo.createNewDepartment(employeeData)

}

const updateDepartment=(id, departmentData)=>{

    return departmentRepo.updateDepartment(id,departmentData)
}

    
const deletedDepartment=(id)=>{
    return departmentRepo.deletedDepartment(id)
}

module.exports = {
            getAllDepartment,
            getDepartmentById,
            createNewDepartment,
            updateDepartment,
            deletedDepartment
}
   