const departmentModel = require("../Models/departmentModel")

const getAllDepartment=()=>{
    return departmentModel.find({})
}

const getDepartmentById=(id)=>{
    return departmentModel.findById(id)
}

const createNewDepartment=async(departmentData)=>{
    const department = new departmentModel(departmentData)
    await department.save()
    return "Department Created.."
}

const updateDepartment =async(id, departmentData)=>{
    console.log("id:", id, "departmentData:", departmentData)
    await departmentModel.findByIdAndUpdate(id,departmentData)
    return "Department updated..."
     
}

const deletedDepartment =async(id)=>{
    await departmentModel.findByIdAndDelete(id)
     return "Department deleted..."
}

module.exports= {getAllDepartment,
                 getDepartmentById,
                 createNewDepartment,
                 updateDepartment,
                 deletedDepartment}