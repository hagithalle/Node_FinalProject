import axios from "axios"

const API_URL = "http://localhost:3000/users"


//Get all users
const getAllUsers = async(token)=>{
    const config = { headers: { Authorization: `Bearer ${token}` } };

    console.log("Service getAllUsers get data:", API_URL, token)

    const {data :response}  = await axios.get(API_URL, config)
    console.log("getAllUsers rsponse:" ,response)

    return response
}

const usersService = {getAllUsers};
export default usersService;