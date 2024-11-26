import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link,useLocation,useNavigate } from 'react-router-dom';

export default function TabEmployee() {
    const location = useLocation()
    const navigate = useNavigate();
    const tabRoutes = ['employees', 'edit-employee', 'new-employee'];
    const currentTab = tabRoutes.find(route => location.pathname.includes(route)) || 'employees';


  const handleChange = (event, newValue) => {
    if(newValue === "employees"){
      navigate(`./main-page/employees`)
    }
    else{
      navigate(`${newValue}`)
    }
  
    
  };

  return (
    <Box sx={{ width: '100%', marginBottom: '20px' }}>
      <Tabs value={currentTab} onChange={handleChange} centered>
        <Tab label="All Employees" value="employees" component={Link} to=""/>
        <Tab label="Edit Employees" value="edit-employee"/>
        <Tab label="New Employees" value="new-employee" />
      </Tabs>
    </Box>
  );
}