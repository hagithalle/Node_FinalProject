import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import employeesService from "../Services/employeesService";


const initialState = {
    employeeData: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Async actions for CRUD operations
export const getAllEmployees = createAsyncThunk(
    "employees/getAll",
    async (_, thunkAPI) => {
        try {
            console.log("getAllEmployees")
            const token = thunkAPI.getState().auth.user.token;
            return await employeesService.getAllEmployee(token);
        } catch (err) {
            const msg = (err.response?.data?.message) || err.message || err.toString();
            return thunkAPI.rejectWithValue({ message: msg, status: err.response?.status });
        }
    }
);
export const addShiftToEmployee = createAsyncThunk(
    "employees/addShiftToEmployee",
    async ({id,shiftId}, thunkAPI) => {
        try {
            console.log("employees/addShiftToEmployee:", id,shiftId);
            const token = thunkAPI.getState().auth.user.token;
            console.log("employees/addShiftToEmployee:", id,shiftId, token);
            
            return await employeesService.addShiftToEmployee(id,shiftId, token);
        } catch (err) {
            const msg = (err.response?.data?.message) || err.message || err.toString();
            return thunkAPI.rejectWithValue({ message: msg, status: err.response?.status });
        }
    }
);


export const createNewEmployee = createAsyncThunk(
    "employees/create",
    async (newEmployee, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await employeesService.createNewEmployee(newEmployee, token);
        } catch (err) {
            const msg = (err.response?.data?.message) || err.message || err.toString();
            return thunkAPI.rejectWithValue({ message: msg, status: err.response?.status });
        }
    }
);

export const updateEmployee = createAsyncThunk(
    "employees/update",
    async (employeeData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await employeesService.updateEmployee(employeeData, token);
        } catch (err) {
            const msg = (err.response?.data?.message) || err.message || err.toString();
            return thunkAPI.rejectWithValue({ message: msg, status: err.response?.status });
        }
    }
);

export const deleteEmployee = createAsyncThunk(
    "employees/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await employeesService.deleteEmployee(id, token);
        } catch (err) {
            const msg = (err.response?.data?.message) || err.message || err.toString();
            return thunkAPI.rejectWithValue({ message: msg, status: err.response?.status });
        }
    }
);

export const employeesSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
        },
        filterEmployeesByDepartment: (state, action) => {
            state.employeeData = action.payload
                ? state.employeeData.filter((employee) => employee.departmentId === action.payload)
                : state.employeeData;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllEmployees.pending, (state) => { state.isLoading = true; })
            .addCase(getAllEmployees.fulfilled, (state, action) => {
                console.log("getAllEmployees action.payload: ", action.payload.data)
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                state.employeeData = action.payload.data;
                console.log("state.employeeData:", state.employeeData)
            })
            .addCase(getAllEmployees.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message || "Error";
            })
            .addCase(createNewEmployee.pending, (state) => { state.isLoading = true; })
            .addCase(createNewEmployee.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
            })
            .addCase(createNewEmployee.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            })
            .addCase(updateEmployee.pending, (state) => { state.isLoading = true; })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
            })
            .addCase(updateEmployee.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            })
            .addCase(deleteEmployee.pending, (state) => { state.isLoading = true; })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
            })
            .addCase(deleteEmployee.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            })
            .addCase(addShiftToEmployee.pending, (state) => { state.isLoading = true; })
            .addCase(addShiftToEmployee.fulfilled, (state, action) => {
                console.log("addShiftToEmployee:",action.payload)
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
            })
            .addCase(addShiftToEmployee.rejected, (state, action) => {
                console.log("addShiftToEmployee:",action.payload)
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            });
    },
});

export const { reset, filterEmployeesByDepartment } = employeesSlice.actions;
export default employeesSlice.reducer;