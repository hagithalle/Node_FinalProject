import { useState, useEffect } from "react";
import { Container, Typography, TextField, Box, CssBaseline, InputLabel, Select, MenuItem, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createNewEmployee } from "../../dl/slices/employeesSlice";
import { useNavigate } from "react-router-dom";
import { getAllDepartment } from "../../dl/slices/departmentSlice";
import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import SaveIcon from '@mui/icons-material/Save';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { reset } from "../../dl/slices/employeesSlice";

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

export default function NewEmployee() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { employeeData, isError, isSuccess, isLoading, message } = useSelector(state => state.employees);

    // Fetching departments data from state
    const { departmentData } = useSelector(state => state.department);

    // Local state for form inputs
    const [newEmployee, setNewEmployee] = useState({
        firstName: "",
        lastName: "",
        startWork: 0,
        departmentId: "", // Default value is empty for no department
    });


    useEffect(() => {
        // Fetch departments data when the component mounts
        dispatch(getAllDepartment());
    }, [dispatch]);

    // Handles changes to form inputs
    const handleChange = (e) => {
        setNewEmployee({
            ...newEmployee,
            [e.target.name]: e.target.value
        });
    };

    // Handles form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createNewEmployee(newEmployee));
        navigate("../")
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
                    New Employee
                </Typography>
                <form noValidate style={{ width: '80%', marginTop: 8 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        onChange={handleChange}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        onChange={handleChange}
                    />
                    <InputLabel id="department-label">Department</InputLabel>
                    <Select
                        labelId="department-label"
                        id="department"
                        name="departmentId"
                        fullWidth
                        value={newEmployee.departmentId}
                        onChange={handleChange}
                    >
                        <MenuItem value="">No Department</MenuItem> {/* Allow no department */}
                        {departmentData?.map(dept => (
                            <MenuItem key={dept._id} value={dept._id}>{dept.name}</MenuItem>
                        ))}
                    </Select>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="startWork"
                        label="Start Year"
                        name="startWork"
                        type="number"
                        onChange={handleChange}
                    />
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
                            Save Employee
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