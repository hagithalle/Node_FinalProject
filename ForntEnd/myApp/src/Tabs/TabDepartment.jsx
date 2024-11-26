import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link,useLocation,useNavigate } from 'react-router-dom';

export default function TabDepartment() {
    const location = useLocation()
    const navigate = useNavigate();
    const tabRoutes = ['departments', 'edit-department', 'new-department'];
    const currentTab = tabRoutes.find(route => location.pathname.includes(route)) || 'departments';


  const handleChange = (event, newValue) => {

      navigate(`${newValue}`)
    }
   

  return (
    <Box sx={{ width: '100%', marginBottom: '20px' }}>
      <Tabs value={currentTab} onChange={handleChange} centered>
        <Tab label="All Department" value="departments" component={Link} to=""/>
        <Tab label="Edit Department" value="edit-department"/>
        <Tab label="New Department" value="new-department" />
      </Tabs>
    </Box>
  );
}