import { useState, useEffect } from "react";
import { Container, Typography, TextField, Box, CssBaseline, InputLabel, Select, MenuItem, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewDepartment, getAllDepartment } from "../../dl/slices/departmentSlice";
import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import SaveIcon from '@mui/icons-material/Save';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { reset } from "../../dl/slices/employeesSlice";
import { getAllUsers } from "../../dl/slices/usersSlice";

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: '#4caf50',
    },
  },
});

export default function NewDepartment() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {isError, isSuccess, isLoading, message } = useSelector(state => state.department);

    const {users} = useSelector(state => state.users);

    const [newDepartment, setNewDepartment] = useState({
        name: "",
        manager: ""
    })


    useEffect(() => {
        // Fetch departments data when the component mounts
        dispatch(getAllUsers());
    }, [dispatch]);

    // Handles changes to form inputs
    const handleChange = (e) => {
        console.log("handleChange:" ,e.target)
        setNewDepartment({
            ...newDepartment,
            [e.target.name]: e.target.value
        });
    };

    // Handles form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("newDepartment:", newDepartment)
        dispatch(createNewDepartment(newDepartment));
        navigate("../");
    };

    useEffect(() => {
        if (isError) {
          toast.error(message);
        }
        if (isSuccess) {
          toast.success(message);
        }
        return () => {
          dispatch(reset());
        };
      }, [isError, isSuccess, dispatch]);



    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div
                style={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    padding: 16,
                    borderRadius: 8
                }}
            >
                <Typography component="h1" variant="h5">
                    New Department
                </Typography>
                <form noValidate style={{ width: '80%', marginTop: 8 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        onChange={handleChange}
                        autoFocus
                    />
                    <InputLabel id="department-label">Manger:</InputLabel>
                    <Select
                        labelId="department-label"
                        id="manager"
                        name="manager"
                        fullWidth
                        value={newDepartment.manager}
                        onChange={handleChange}
                    >
                        {users?.map(user => (
                            <MenuItem key={user._id} value={user._id}>{user.fullName}</MenuItem>
                        ))}
                    </Select>
                   
                    <Box mt={2}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                backgroundColor: '#32a852', // Replace with your desired color code
                                '&:hover': {
                                    backgroundColor: '#27913b', // Darker shade for hover effect
                                }
                            }}
                            onClick={handleSubmit}
                        >
                            <SaveIcon sx={{ marginRight: 1 }}/>
                            Save Department
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            style={{ marginTop: 8 }}
                            onClick={() => navigate("../")}
                        >
                            Cancel
                        </Button>
                    </Box>
                </form>
            </div>
        </Container>
    );
}