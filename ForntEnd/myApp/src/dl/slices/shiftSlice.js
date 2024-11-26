import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import shiftsService from "../Services/shiftService";

const initialState = {
    shiftsData: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Async actions for CRUD operations
export const getAllShifts = createAsyncThunk(
    "shifts/getAll",
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            //const token = state.auth?.user?.token; // Use optional chaining
            const token = sessionStorage.getItem('token')
            console.log( "get:", token)
            if (!token) {
               
                throw new Error("Authentication token is missing");
            }

            return await shiftsService.getAllShifts(token);
        } catch (err) {
            console.error("Error fetching shifts:", err); // Log the entire error object
            const msg = (err.response?.data?.message) || err.message || err.toString();
            return thunkAPI.rejectWithValue({ message: msg });
        }
    }
);

// Async actions for CRUD operations
export const createNewShift = createAsyncThunk(
    "shifts/create",
    async (newShift, thunkAPI) => {
        try {
            console.log("shifts/create:", newShift);
            const state = thunkAPI.getState();
            const token = state.auth?.user?.token;

            if (!token) {
                const x = sessionStorage.getItem("token")
                throw new Error("Authentication token is missing, x=", x);
            }

            console.log("token:", token);
            return await shiftsService.createNewShift(newShift, token);
        } catch (err) {
            const msg = (err.response?.data?.message) || err.message || err.toString();
            return thunkAPI.rejectWithValue({ message: msg, status: err.response?.status });
        }
    })

    // Async actions for CRUD operations
export const getShiftById = createAsyncThunk(
    "shifts/getById",
    async (id, thunkAPI) => {
        try {
            console.log("shifts/getById:", newShift);
            const state = thunkAPI.getState();
            const token = state.auth?.user?.token;

            if (!token) {
                const x = sessionStorage.getItem("token")
                throw new Error("Authentication token is missing, x=", x);
            }

            console.log("token:", token);
            return await shiftsService.getShiftById(id, token);
        } catch (err) {
            const msg = (err.response?.data?.message) || err.message || err.toString();
            return thunkAPI.rejectWithValue({ message: msg, status: err.response?.status });
        }
    }
)


export const updateShift = createAsyncThunk(
    "shifts/update",
    async (shiftData, thunkAPI) => {
        try {
            console.log("shifts/update:", shiftData);  // Log to check what's being sent
            const token = thunkAPI.getState().auth.user.token;
            return await shiftsService.updateShift(shiftData, token);
        } catch (err) {
            const msg = (err.response?.data?.message) || err.message || err.toString();
            return thunkAPI.rejectWithValue({ message: msg, status: err.response?.status });
        }
    }
);



// Additional async actions (createNewShift, updateShift, getShiftById, etc.)

export const shiftSlice = createSlice({
    name: "shifts",
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
            .addCase(getAllShifts.pending, (state) => { state.isLoading = true; })
            .addCase(getAllShifts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                state.shiftsData = action.payload.data;
            })
            .addCase(getAllShifts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message || "Error";
            })
            .addCase(createNewShift.pending, (state) => { state.isLoading = true; })
            .addCase(createNewShift.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
            })
            .addCase(createNewShift.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            })
            .addCase(getShiftById.pending, (state) => { state.isLoading = true; })
            .addCase(getShiftById.fulfilled, (state, action) => {
                console.log(action.payload)
                state.isLoading = false;
                state.isSuccess = true;
                state.shiftsData = action.payload.data;
                state.message = action.payload.message;
            })
            .addCase(getShiftById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            })
            .addCase(updateShift.pending, (state) => { state.isLoading = true; })
            // Inside the extraReducers:
            .addCase(updateShift.fulfilled, (state, action) => {
                console.log("Updated Shift Response:", action.payload);  // Log the API response
                state.isLoading = false;
                state.isSuccess = true;
                state.shiftsData = state.shiftsData.map(shift =>
                    shift._id === action.payload._id ? action.payload : shift
                );  // Update the specific shift in the shiftsData array
                state.message = action.payload.message;
            })
            .addCase(updateShift.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            });
        // Additional case handlers for other actions
    },
});

export const { reset } = shiftSlice.actions;
export default shiftSlice.reducer;