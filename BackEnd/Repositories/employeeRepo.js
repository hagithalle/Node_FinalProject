const employeeModel = require("../Models/employeeModel")

const getAllEmployees=()=>{
    return employeeModel.find({})
}

const getEmployeeById=(id)=>{
    return employeeModel.findById(id)
}

const createNewEmployee=async(employeeData)=>{
    const employee = new employeeModel(employeeData)
    await employee.save()
    return "Employee Created.."
}

const updateEmployee =async(id, employeeData)=>{
    await employeeModel.findByIdAndUpdate(id, employeeData)
     return "Employee updated..."
}

const deletedEmployee =async(id)=>{
    await employeeModel.findByIdAndDelete(id)
     return "Employee deleted..."
}

const addShiftToEmployee=async(employeeId, shiftId)=>{
    await employeeModel.findByIdAndUpdate(employeeId,
        {$push: {shifts: shiftId}},
        {new: true}
    );
    return `Add shifts:${shiftId} to employee: ${employeeId}` 

}
const deleteShiftFromEmployee = async(employeeId, shiftId) => {
    await employeeModel.findByIdAndUpdate(
      employeeId,
      { $pull: { shifts: shiftId } }, 
      { new: true } 
    );
    return `delted  shifts:${shiftId} to employee: ${employeeId}` 
  };

  const deleteAllEmployessByDepartmentId= async(id)=>{
    return await employeeModel.deleteMany({departmentId: id})
 
  }

module.exports= {getAllEmployees, 
                    getEmployeeById, 
                    createNewEmployee,
                    updateEmployee,
                    deletedEmployee, 
                    addShiftToEmployee, 
                    deleteShiftFromEmployee,
                    deleteAllEmployessByDepartmentId}