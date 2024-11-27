import { json } from "react-router-dom"
import axios from "axios"

const API_URL = "http://127.0.0.1:3000/users/"


const login = async (user) => {
    try {
        console.log("authService user=",user)
        const {data: response} = await axios.post(`${API_URL}/login`, user);
        console.log("Response Data for login: ", response.data);  // Debugging to check response data
        
        // Access token and user from response.data.data
        if (response.data?.token) {
            console.log("Token: ", response.data.token); // Debugging token presence

            response.data.user.token = response.data.token;
            sessionStorage.setItem("user", JSON.stringify(response.data.user));
            sessionStorage.setItem("token", response.data.token);
        } else {
            console.log("No token received in response.");
        }
        return response.data; // Return the expected data structure
    } catch (error) {
        console.error("Login error: ", error); // Log the error details
        throw error.response ? error.response.data : error;
    }
};
const getUser = async(email,token)=>{
    console.log("XX")
    const config = { headers: { Authorization: `Bearer ${token}` } };

    console.log("Service get user get data:", API_URL, token)

    const {data :response}  = await axios.get(API_URL+email, config)
    console.log("get user rsponse:" ,response)

    return response
}


const logOut = ()=>{
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token")
    window.location.reload()
}

const authService = {login,getUser, logOut}

export default authService