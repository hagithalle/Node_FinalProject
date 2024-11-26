import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../Services/authService";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};

// Login action
export const authLogin = createAsyncThunk(
    "/users/login",
    async (user, thunkAPI) => {
      try {
        return await authService.login(user);
      } catch (err) {
        const msg =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString;
        return thunkAPI.rejectWithValue({
          message: msg,
          status: err.response.status,
        });
      }
    }
  );
  

export const authLogOut = createAsyncThunk("auth/logout", async () => {
    await authService.logOut();
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
        },
        setAuthToken: (state, action) => {
            state.token = action.payload; // Set token from session storage
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authLogin.pending, (state) => {
              //console.log("authLogin.pending:", action.payload.message);
                state.isLoading = true;
            })
            .addCase(authLogin.fulfilled, (state, action) => {
               //console.log("authLogin.fulfilled:", action.payload);
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.user;
                state.message = action.payload.message;
            })
            .addCase(authLogin.rejected, (state, action) => {
                console.log("authLogin.rejected:", action.payload?.message);
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload?.message || "Login failed";
                state.user = null;
            })
            .addCase(authLogOut.fulfilled, (state) => {
                state.user = null;
                state.token = null; // Clear token on logout
            });
    }
});

export const { setAuthToken, reset } = authSlice.actions;
export default authSlice.reducer;