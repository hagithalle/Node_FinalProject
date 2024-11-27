import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import departmentService from "../Services/departmentService";

const initialState = {
    departmentData: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Async actions for CRUD operations
export const getAllDepartment = createAsyncThunk(
    "department/getAll",
    async (_, thunkAPI) => {
       
        try {
            console.log("department/getAll")
            const token = thunkAPI.getState().auth.user.token;
            return await departmentService.getAllDepartment(token);
        } catch (err) {
            console.log("err: ", err)
            const msg = (err.response?.data?.message) || err.message || err.toString();
            return thunkAPI.rejectWithValue({ message: msg, status: err.response?.status });
        }
    }
);

export const createNewDepartment = createAsyncThunk(
    "department/create",
    async (newDepartment, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await departmentService.createNewDepartment(newDepartment, token);
        } catch (err) {
            const msg = (err.response?.data?.message) || err.message || err.toString();
            return thunkAPI.rejectWithValue({ message: msg, status: err.response?.status });
        }
    }
);

export const updateDepartment= createAsyncThunk(
    "department/update",
    async (departmentData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await departmentService.updateDepartment(departmentData, token);
        } catch (err) {
            const msg = (err.response?.data?.message) || err.message || err.toString();
            return thunkAPI.rejectWithValue({ message: msg, status: err.response?.status });
        }
    }
);

export const deleteDepartment = createAsyncThunk(
    "department/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await departmentService.deleteDepartment(id, token);
        } catch (err) {
            const msg = (err.response?.data?.message) || err.message || err.toString();
            return thunkAPI.rejectWithValue({ message: msg, status: err.response?.status });
        }
    }
);
// Async action for fetching a department by ID
export const getDepartmentById = createAsyncThunk(
    "department/getById",
    async (departmentId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await departmentService.getDepartmentById(departmentId, token);
        } catch (err) {
            const msg = (err.response?.data?.message) || err.message || err.toString();
            return thunkAPI.rejectWithValue({ message: msg, status: err.response?.status });
        }
    }
);

export const departmentSlice = createSlice({
    name: "department",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllDepartment.pending, (state) => { state.isLoading = true; })
            .addCase(getAllDepartment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                state.departmentData = action.payload.data;
            })
            .addCase(getAllDepartment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message || "Error";
            })
            .addCase(createNewDepartment.pending, (state) => { state.isLoading = true; })
            .addCase(createNewDepartment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
            })
            .addCase(createNewDepartment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            })
            .addCase(updateDepartment.pending, (state) => { state.isLoading = true; })
            .addCase(updateDepartment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
            })
            .addCase(updateDepartment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            })
            .addCase(deleteDepartment.pending, (state) => { state.isLoading = true; })
            .addCase(deleteDepartment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
            })
            .addCase(deleteDepartment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            })
                // getDepartmentById cases
                .addCase(getDepartmentById.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(getDepartmentById.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.departmentData = action.payload.data;
                    state.message = action.payload.message;
                })
                .addCase(getDepartmentById.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload.message;
                });
    },
});

export const { reset } = departmentSlice.actions;
export default departmentSlice.reducer;