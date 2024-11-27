import { useState, useEffect } from "react";
import { Box, Typography, CssBaseline } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../dl/slices/authSlice";

export default function UserDashboard() {
  const { user, isLoading, isError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    
    if (currentUser && !user) {  
      dispatch(getUser(currentUser.email)); 
    }
  }, [dispatch, user]);  

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h4">Loading...</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h4" color="error">Error loading user data.</Typography>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h4">No user data found. Please log in.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
      <Typography variant="h3">{user.fullName}</Typography>
      <Typography variant="h5">
        You have {user.actionsAllowed} out of {user.numOfActions} actions left for today.
      </Typography>
    </Box>
  );
}