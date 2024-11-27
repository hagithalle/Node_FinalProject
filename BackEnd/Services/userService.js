const userRepo = require("../Repositories/userRepo");
const jwt = require("jsonwebtoken");

const getAllUsers = () => {
  return userRepo.getAllUsers();
};

const getUserByEmail=(email)=>{
  return userRepo.getUserByEmail(email)
}

const checkUserLogin = async (email, userName) => {
  const user = await userRepo.getUserByEmail(email);

  if (!user) return "Login failed: email address not found";

  if (user.userName !== userName) return "Login failed: Incorrect userName";

  const token = generateToken(user);

  return { user, token };
};

const initData = async () => {
  const { data: allUserFromRestAPI } = await userRepo.getUsersFromRestAPI();
  console.log("allUserFromRestAPI: ",allUserFromRestAPI)
  const dbUsers = await userRepo.getAllUsers();
  console.log("dbUsers:", dbUsers)
  console.log(dbUsers.length)
 
  if (!dbUsers.length) {
    console.log("dbUsers.length")
    allUserFromRestAPI.forEach(async (user, index) => {
      const newUser = {};

      newUser.userId = user.id;
      newUser.fullName = user.name;
      newUser.userName = user.username;
      newUser.email = user.email;
      newUser.numOfActions = 300;
      newUser.actionsAllowed = 300;

      await userRepo.createNewUser(newUser);
    });
  } else {
    return { message: "Database already exists", success: false };
  }
  return { message: "init data completed successfully", success: true };
};

const updateUser = async (id, user) => {
  console.log("updateUser: ", id, user)
  try {
    const updatedUser = await userRepo.updateUser(id, user);
    console.log(updatedUser);
    if (!updatedUser) {
      return { message: "User not found or update failed", success: false };
    }

    return { message: "User updated successfully", updatedUser, success: true };
  } catch (error) {
    console.error("Error updating user:", error);
    return { message: `Update failed: ${error.message}`, success: false };
  }
};

const scheduleUpdateUserAction = async () => {
  const users = await userRepo.getAllUsers();
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    await userRepo.updateActionAllowed(user);
  }

  const date = new Date();
  console.log(`${date.toString().split("GMT")[0]} Update All users' actions`);
};

function generateToken(user) {
  try {
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return token;
  } catch (error) {
    console.error("Error generating token: ", error);
    return null;
  }
}

module.exports = {
  getAllUsers,
  updateUser,
  checkUserLogin,
  initData,
  scheduleUpdateUserAction,
  getUserByEmail
};