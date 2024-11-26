import { useState, useEffect } from "react";
import { Box, Typography, CssBaseline } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserDashboard() {
  const [user, setUser] = useState(null);  // Initialize as null to signify no user data at first
  const [isLoading, setIsLoading] = useState(true);  // Add a loading state

  // Fetch the current user from session storage
  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    if (currentUser) {
      setUser(currentUser);
    }
    setIsLoading(false);  // Set loading to false once user is fetched
  }, []);  // Empty dependency array to run once on mount

  // Show error toast if there's an issue loading user data
  useEffect(() => {
    if (user && user.actionsAllowed === 0) {
     // toast.error("Action allowed today is 0; user cannot perform any more actions.");
    }
  }, [user]);

  // Loading state or error handling while user data is being fetched
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '90vh',
          textAlign: 'center',
        }}
      >
        <CssBaseline />
        <Typography variant="h3" component="div" sx={{ textAlign: "center" }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  // Display when user is not allowed to perform any action
  if (user && user.actionsAllowed === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '90vh',
          textAlign: 'center',
        }}
      >
        <CssBaseline />
        <Typography variant="h3" component="div" sx={{ textAlign: "center" }}>
          {user.fullName || 'Loading...'}
        </Typography>
        <Typography variant="h5" component="div" sx={{ textAlign: "center" }}>
          You are not allowed to do any actions today.
        </Typography>
      </Box>
    );
  }

  // Display user details when data is available
  if (user) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '90vh',
          textAlign: 'center',
        }}
      >
        <CssBaseline />
        <Typography variant="h3" component="div" sx={{ textAlign: "center" }}>
          {user.fullName || 'Loading...'}
        </Typography>
        <Typography variant="h5" component="div" sx={{ textAlign: "center" }}>
          {`You have ${user.actionsAllowed} out of ${user.numOfActions} actions left for today`}
        </Typography>
      </Box>
    );
  }

  return null;  // Return null if no user is found or user data is still unavailable
}