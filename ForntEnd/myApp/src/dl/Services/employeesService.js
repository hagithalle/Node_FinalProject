import axios from "axios";

const API_URL = "http://localhost:3000/employees";
const SHIFT_URL = "http://localhost:3000/shifts";
const DEPT_URL = "http://localhost:3000/departments";

// Get all employees with department and shift data
const getAllEmployee = async (token) => {
    console.log("getAllEmployee")
    const config = { headers: { Authorization: `Bearer ${token}` } };

    console.log("Service getAllEmployees get data:", API_URL, token);

    try {
        const { data: allEmployees } = await axios.get(API_URL, config);
        const { data: allShifts } = await axios.get(SHIFT_URL, config);
        console.log('allEmployees response:', allEmployees);
        console.log('allShifts response:', allShifts.data);
    
        await Promise.all(
            allEmployees.data.map(async (emp) => {
                const { data: depName } = await axios.get(`${DEPT_URL}/${emp.departmentId}`, config);
                emp.departmentData = depName.data;
    
                console.log("emp:", emp)
                emp.shiftsData = emp.shifts?.map((shiftId) => {
                    const shift = allShifts.data.find((s) => s._id === shiftId);
                    return shift
                        ? { date: shift.date, startingHour: shift.startingHour, endingHour: shift.endingHour }
                        : null;
                }).filter((shift) => shift !== null);

                console.log("emp:", emp)
            })
        );
        return { data: allEmployees.data };

    } catch (error) {
        console.error('Error fetching employees or shifts:', error);
    }


};

// Create a new employee
const createNewEmployee = async (newEmployee, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    console.log("Service createNewEmployee get data:", API_URL, newEmployee, token);
    newEmployee.startYear = +newEmployee.startYear;

    const { data } = await axios.post(API_URL, newEmployee, config);
    console.log("New Employee:", data);

    return data;
};

// Update an existing employee
const updateEmployee = async (employeeData, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    console.log("Service updateEmployee get data:", `${API_URL}/${employeeData.id}`, employeeData, token);
    const { data: status } = await axios.put(`${API_URL}/${employeeData.id}`, employeeData, config);

    return status;
};

// Delete an employee
const deleteEmployee = async (id, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    console.log("Service deleteEmployee get data:", `${API_URL}/${id}`, id, token);
    const { data: status } = await axios.delete(`${API_URL}/${id}`, config);

    return status;
};

const addShiftToEmployee = async (id, shiftId, token) => {
    try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        console.log("shiftId:", shiftId)
        console.log("service addShiftToEmmployee: ", `${API_URL}/${id}/Shift`, shiftId, config)
        const { data } = await axios.put(`${API_URL}/${id}/Shift`,{shiftId}, config);
        return data;
    } catch (error) {
        console.error("Error adding shift to employee:", error);
        throw error;
    }
};
// Update an existing employee
const deletedShiftToEmployee = async (id, shiftId, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    // Modify the payload to include the shiftId
    console.log("Service updateEmployee get data:", `${API_URL}/${id}`, token);
    
    const { data: status } = await axios.put(`${API_URL}/${id}/Shift`, config);

    return status;
};


const employeesService = {
    addShiftToEmployee,
    getAllEmployee,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    deletedShiftToEmployee

};

export default employeesService;