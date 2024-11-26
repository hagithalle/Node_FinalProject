import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch,useSelector } from 'react-redux';
import { authLogin , reset} from '../dl/slices/authSlice';

const theme = createTheme();



export default function Login() {
  const navigate = useNavigate(); // useNavigate hook for navigation
  const dispatch = useDispatch();

  const {user, isError, isSuccess, isLoading, message} = useSelector((state)=>state.auth)

  const [userLogin, setUserLogin] = useState({
    userName: '',
    email: ''
});
const handleSubmit = (event) => {
  event.preventDefault();
  console.log("userLogin:", userLogin);
  dispatch(authLogin(userLogin))
};

const handleChange = (e) => {
  setUserLogin({
    ...userLogin,
    [e.target.name]: e.target.value
  });
};
const handleSeedLoading=async(e)=>{
  e.preventDefault()
  const {data}= await axios.get("http://localhost:3000/users/init")
  console.log("data:", data)
  if(data.success)
  {
    toast.info(data.message)
  }
  else{
    toast.error(data.message)
  }

}

useEffect(()=>{
  if(isError){
      toast.error(message)
  }

  if(isSuccess){
    console.log("user:",user, isSuccess)
      toast.success(message)
      navigate('/main-page/dashboard');
  }
  return()=>{
      dispatch(reset())
  }
},[isError,isSuccess,dispatch])



  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundColor: 'secondary' ,minHeight: '100vh'}}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        
        <div
          style={{
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white'
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form noValidate style={{ width: '80%', marginTop: theme.spacing(1) }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="UserName"
              name="userName"
              autoComplete="userName"
              value={userLogin.userName}
              onChange={handleChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={userLogin.email}
              onChange={handleChange}
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="light"
              style={{ margin: theme.spacing(3, 0, 2) }}
              onClick={handleSubmit}
            >
              Login In
            </Button>

            <Button
              fullWidth
              variant="contained"
              color="secondary"
              style={{ margin: theme.spacing(3, 0, 2) }}
              onClick={handleSeedLoading}
             
            >
              Seed loading
            </Button>
          </form>
        </div>
       
      </Container>
      </div>
    </ThemeProvider>
  );
}