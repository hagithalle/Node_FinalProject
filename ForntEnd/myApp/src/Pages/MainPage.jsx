import MainNababr from "../Navbar/MainNavbar";
import { Outlet } from 'react-router-dom';
import { Box, Grid } from "@mui/material";
import { Navigate } from "react-router-dom";

export default function MainPage(){
   
        const user = JSON.parse(sessionStorage.getItem("user")); // Get user data to check authentication
      
        if (!user) {
            console.log("MainPage -User:", user)
          // Redirect to login if no user is logged in
          return <Navigate to="/" replace />;
        }

    return( 
        <Box sx={{ flexGrow: 1 , background:"#E6E6FA"}}>
        <Grid container spacing={4}>
               {/* Right Side: Navbar */}
               <Grid item sm={4} md={12} sx={{ order: { xs: 1, sm: 1 } }}>
                <MainNababr />
            </Grid>
         
            {/* Left Side: Outlet */}
            <Grid item sm={8} md={12} sx={{ order: { xs: 2, sm: 2 } }}>
                <Outlet /> {/* Renders Employees and TabEmployee based on route */}
            </Grid>

         
        </Grid>
    </Box>
)}