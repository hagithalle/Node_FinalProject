import axios from "axios";
import employeesService from "./employeesService";

const API_URL = "http://localhost:3000/departments";

// Get all departments
const getAllDepartment = async (token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    console.log("Service getAllDepartment get data:", API_URL, config);

    const { data: allDepartment } = await axios.get(API_URL, config);
    console.log("allDepartment: ", allDepartment);

    const { data: allEmployees } = await axios.get(`http://localhost:3000/employees`, config);
    console.log("allEmployees: ", allEmployees);

    // Check if allDepartment has data
    if (allDepartment.data && allDepartment.data.length > 0) {
        // Add manager data and employees
        const processedDepartments = allDepartment.data.map(dep => {
            if (allEmployees.length > 0) {
                const manager = allEmployees.find(emp => emp._id === dep.manager); // Fixed typo from 'manger' to 'manager'
                dep.managerData = manager;

                // Add employees in and out of the department
                const employees = {
                    inDepartment: [],
                    notInEmployees: []
                };

                allEmployees.forEach(emp => {
                    if (emp.departmentId === dep._id) {
                        employees.inDepartment.push(emp);
                    } else {
                        employees.notInEmployees.push(emp);
                    }
                });

                dep.employees = employees.inDepartment;
                dep.notInEmployees = employees.notInEmployees;

                return dep; // Return the modified department
            }
            // If no employees, return the department as is
            return dep; 
        });

        return { data: processedDepartments }; // Return structured data
    }

    // If there are no departments
    return { data: [] }; // Return an empty array or handle as needed
};

// Delete an department
const getDepartmentById= async (id, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    console.log("Service getDepartmentById get data:", `${API_URL}/${id}`, id, token);
    const { data: status } = await axios.get(`${API_URL}/${id}`, config);

    return status;
};


// Create a new department
const createNewDepartment= async (newDepartment, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    console.log("Service createNewDepartment get data:", API_URL, newDepartment, token);

    const { data } = await axios.post(API_URL, newDepartment, config);
    console.log("New Department:", data);

    return data;
};

// Update an existing department
const updateDepartment = async (departmentData, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    console.log("Service updateDepartment get data:", `${API_URL}/${departmentData.id}`, departmentData, token);
    const { data: status } = await axios.put(`${API_URL}/${departmentData.id}`, departmentData, config);

    return status;
};

// Delete an department
const deleteDepartment= async (id, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    console.log("Service deletedepartment get data:", `${API_URL}/${id}`, id, token);
    const { data: status } = await axios.delete(`${API_URL}/${id}`, config);

    return status;
};

const departmentService = {
    getAllDepartment,
    createNewDepartment,
    updateDepartment,
    deleteDepartment,
    getDepartmentById
};

export default departmentService;