
import React from 'react';
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import TabDepartment from "../Tabs/TabDepartment";

export default function Departments(){
    return( 
        <Box 
            sx={{  
                padding: '20px', 
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column', // Stack children vertically
                alignItems: 'center', // Center horizontally
                width: { xs: '90%', sm: '80%' }, // Responsive width
                margin: 'auto' // Center the Box in the page
            }}
        >
            <TabDepartment />
<Outlet/>
            {/* Add your other employee-related content here */}
        </Box>
    );
}