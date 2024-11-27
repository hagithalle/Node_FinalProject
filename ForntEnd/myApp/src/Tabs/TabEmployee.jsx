import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useLocation, useNavigate } from 'react-router-dom';

export default function TabEmployee() {
  const location = useLocation();
  const navigate = useNavigate();

  // Define the mapping of routes to tab values
  const tabRoutes = {
    employees: './',
    'edit-employee': '/main-page/employees/edit-employee',
    'new-employee': '/main-page/employees/new-employee',
  };

  // Find the active tab based on the current pathname
  const currentTab = Object.keys(tabRoutes).find(route => location.pathname.includes(tabRoutes[route])) || 'employees';

  const handleChange = (event, newValue) => {
    // Navigate to the appropriate path when a tab is clicked
    navigate(tabRoutes[newValue]);
  };

  return (
    <Box sx={{ width: '100%', marginBottom: '20px' }}>
      <Tabs value={currentTab} onChange={handleChange} centered>
        <Tab label="All Employees" value="employees" />
        <Tab label="Edit Employees" value="edit-employee" />
        <Tab label="New Employees" value="new-employee" />
      </Tabs>
    </Box>
  );
}