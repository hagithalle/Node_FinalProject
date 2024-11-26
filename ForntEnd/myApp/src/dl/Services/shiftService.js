import axios from "axios"

const API_URL = "http://localhost:3000/shifts"


//Get all shifts
const getAllShifts= async(token)=>{
    console.log("token:", token)
    const config = { headers: { Authorization: `Bearer ${token}` } };

    console.log("Service getAllShifts get data:", API_URL, token)

    const {data :allShifts}  = await axios.get(API_URL, config)
    console.log("getAllShifts rsponse:" ,allShifts)

    return allShifts
}

//get shift by id
const getShiftById= async (id, token)=>{
    const config = { headers: { Authorization: `Bearer ${token}` } };

    console.log("Service getShiftById get data:", API_URL+id, token)

    const {data : shift}  = await axios.get(API_URL+id, config)
    console.log("getShiftById rsponse:" ,response)

    return shift
}

//create new shift
const createNewShift = async (newShift, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    console.log("Service createNewShift get data:", API_URL, newShift, token);

    const { data } = await axios.post(API_URL, newShift, config);
    console.log("newShift", data);

    return data;
};

// Update an existing shift
const updateShift= async (shiftData, token) => {
const config = { headers: { Authorization: `Bearer ${token}` } };

console.log("Service updateShift get data:", `${API_URL}/${shiftData._id}`, shiftData, token);

const { data: status } = await axios.put(`${API_URL}/${shiftData._id}`, shiftData, config);

return status;
};

const shiftsService = {
    getAllShifts,
    updateShift,
    createNewShift,
    getShiftById
};
export default shiftsService;