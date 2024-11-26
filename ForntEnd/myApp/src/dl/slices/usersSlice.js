import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersService from "../Services/usersService"
import authService from "../Services/authService";


const initialState = {
    users: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    currentUser: null,
};

// Async action to fetch all users
export const getAllUsers = createAsyncThunk(
    "users/getAll",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await usersService.getAllUsers(token);
        } catch (err) {
            const msg = (err.response?.data?.message) || err.message || err.toString();
            return thunkAPI.rejectWithValue({
                message: msg,
                status: err.response?.status
            });
        }
    }
);

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                state.users = action.payload.data;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload.message;
                state.users = null;
                if (action.payload.status === 401) {
                    authService.logOut();
                }
            });
    }
});

export const { reset } = usersSlice.actions;
export default usersSlice.reducer;