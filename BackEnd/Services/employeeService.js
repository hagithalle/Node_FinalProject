const employeeRepo = require("../Repositories/employeeRepo")

const getAllEmployees=()=>{
    return employeeRepo.getAllEmployees()
}

const getEmployeeById= (id)=>{

    return employeeRepo.getEmployeeById(id);
}

const createNewEmployee= (employeeData)=>{
    return employeeRepo.createNewEmployee(employeeData)

}

const updateEmployee=(id, employeeData)=>{

    return employeeRepo.updateEmployee(id,employeeData)
}

    
const deletedEmployee=(id)=>{

    return employeeRepo.deletedEmployee(id)
}

const addShiftToEmployee=(employeeId, shiftId)=>{
  return employeeRepo.addShiftToEmployee(employeeId, shiftId)
}

const deleteShiftFromEmployee= (employeeId,shiftId)=>{
    return employeeRepo.deleteShiftFromEmployee(employeeId,shiftId)
}

const deleteAllEmployessByDepartmentId =(id)=>{
    return employeeRepo.deleteAllEmployessByDepartmentId(id)
} 

module.exports= {getAllEmployees, 
    getEmployeeById, 
    createNewEmployee,
    updateEmployee,
    deletedEmployee, 
    addShiftToEmployee, 
    deleteShiftFromEmployee,
    deleteAllEmployessByDepartmentId}