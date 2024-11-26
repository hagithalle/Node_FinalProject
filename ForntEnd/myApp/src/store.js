import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./dl/slices/authSlice";
import usersReducer from "./dl/slices/usersSlice"; // Adjusted for consistent casing
import employeesReducer from "./dl/slices/employeesSlice";
import departmentReducer from "./dl/slices/departmentSlice";
import shiftReducer from "./dl/slices/shiftSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        employees: employeesReducer,
        department: departmentReducer,
        shifts: shiftReducer
    }
});

export default store;