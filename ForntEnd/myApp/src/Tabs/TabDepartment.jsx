import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link,useLocation,useNavigate } from 'react-router-dom';

export default function TabDepartment() {
    const location = useLocation()
    const navigate = useNavigate();

    const tabRoutes = {
      departments: './',
      'edit-department': '/main-page/departments/edit-department',
      'new-department': '/main-page/departments/new-department',
    };

      // Find the active tab based on the current pathname
  const currentTab = Object.keys(tabRoutes).find(route => location.pathname.includes(tabRoutes[route])) || 'departments';

  const handleChange = (event, newValue) => {
    // Navigate to the appropriate path when a tab is clicked
    navigate(tabRoutes[newValue]);
  };
   

  return (
    <Box sx={{ width: '100%', marginBottom: '20px' }}>
      <Tabs value={currentTab} onChange={handleChange} centered>
        <Tab label="All Department" value="departments" />
        <Tab label="Edit Department" value="edit-department"/>
        <Tab label="New Department" value="new-department" />
      </Tabs>
    </Box>
  );
}