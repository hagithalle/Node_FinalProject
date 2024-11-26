import MainEmployee from "../Components/employees/MainEmployee";
import TabEmployee from "../Tabs/TabEmployee";
import React from 'react';
import { Box } from "@mui/material";
import NewEmployee from "../Components/employees/NewEmployee";
import { Outlet } from "react-router-dom";

export default function Employees(){
    return( 
        <Box 
            sx={{ 
                padding: '20px', 
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column', // Stack children vertically
                alignItems: 'center', // Center horizontally
                width: { xs: '90%', sm: '80%' }, // Responsive width
                margin: 'auto', // Center the Box in the page
                height: '90vh', // Set height to 80% of viewport height
                overflowY: 'auto',
                 // Enable scrolling if content exceeds height
            }}
        >
            <TabEmployee />
<Outlet/>
            {/* Add your other employee-related content here */}
        </Box>
    );
}