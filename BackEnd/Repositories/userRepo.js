const userModel = require("../Models/userModel")
const axios = require("axios")

const URL_USERS= "https://jsonplaceholder.typicode.com/users"

const getAllUsers=()=>{
    return userModel.find({});
}
const getUserByEmail=(email)=>{
    return userModel.findOne({email: email})
}

const createNewUser = async(user)=>{
    const newUser = new userModel(user)
    await newUser.save()
    return newUser
}

const updateUser=(id, user)=>{
    return userModel.findByIdAndUpdate(id, user)
}

const getUsersFromRestAPI=()=>{
    console.log(getUsersFromRestAPI)
    return axios.get(URL_USERS)
}

const updateActionAllowed=(user)=>{

    return userModel.findByIdAndUpdate(user._id, {actionsAllowed: user.numOfActions})
}

module.exports = {getAllUsers,getUserByEmail,createNewUser,updateUser,getUsersFromRestAPI, updateActionAllowed}