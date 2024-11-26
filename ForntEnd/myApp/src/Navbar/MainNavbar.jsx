import { useState, useEffect } from 'react';
import { CssBaseline, Toolbar, Typography, AppBar, Box, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authLogOut } from '../dl/slices/authSlice';

const navItems = [
  { name: 'Employees', link: 'employees' },
  { name: 'Departments', link: 'departments' },
  { name: 'Shifts', link: 'shifts' },
  { name: 'Users', link: 'users' }
];

export default function MainNavbar() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      setName(`${user.fullName}`);
    }
  }, []);

  const logOut = () => {
    dispatch(authLogOut());
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: '#6a1b9a' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: "space-between", alignItems: 'center', flexWrap: 'wrap' }}>
          <Box color='pink' sx={{ display: 'flex', alignItems: 'center', marginBottom: { xs: 1, sm: 0 } }}>
            <PersonIcon />
            <Typography variant="h6" component="div" sx={{ marginLeft: 1 }  }>
              <Button sx={{ 
                  color: '#fff',
                  textTransform: 'capitalize', 
                  fontSize: '1.25rem', 
                  padding: 0, 
                  paddingLeft: "10px",
                  flexShrink: 0  }} onClick={() => navigate(`/main-page/dashboard`)}>{name}</Button>
            </Typography>
          </Box>

          <Box 
            sx={{ 
              display: 'flex', 
              gap: 2, 
              justifyContent: 'center', 
              flexGrow: 1, 
              flexWrap: 'wrap',
              textAlign: 'center'
            }}
          >
            {navItems.map((item) => (
              <Button 
                key={item.name} 
                sx={{ 
                  color: '#fff', 
                  textTransform: 'capitalize', 
                  fontSize: '1.25rem', 
                  padding: 0, 
                  paddingLeft: "10px",
                  flexShrink: 0 
                }}
                onClick={() => navigate(`/main-page/${item.link}`)}
              >
                {item.name}
              </Button>
            ))}
          </Box>

          <Box>
            <Button sx={{ color: '#fff' }} onClick={logOut}>
              <LogoutIcon />
              Log Out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
