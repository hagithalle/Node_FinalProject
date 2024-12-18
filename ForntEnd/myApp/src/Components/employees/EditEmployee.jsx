import { useSelector, useDispatch } from "react-redux";
import { updateEmployee, deleteEmployee, reset } from "../../dl/slices/employeesSlice";
import { getAllShifts } from "../../dl/slices/shiftSlice";
import TableComp from "../TableComp";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Typography, Box, TextField, InputLabel, Select, MenuItem, Button, Grid, CssBaseline } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import { toast } from 'react-toastify';

export default function EditEmployee() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { departmentData } = useSelector(state => state.department);
    const { employeeData, isError, isSuccess, message } = useSelector(state => state.employees);
    const { shiftsData: shifts } = useSelector(state => state.shifts);
    const [selectedEmployee, setSelectedEmployee] = useState(false);

    const [editEmployee, setEditEmployee] = useState({
        id: "",
        firstName: "",
        lastName: "",
        startWork: 0,
        departmentId: "",
        shifts: []
    });

    useEffect(() => {
        dispatch(getAllShifts());
    }, [dispatch]);

    useEffect(() => {
        if (location.state) {
            setSelectedEmployee(true);
            const { _id, firstName, lastName, startWork, departmentId, shifts } = location.state;
            setEditEmployee({ id: _id, firstName, lastName, startWork, departmentId, shifts });
        }
    }, [dispatch, location.state]);

    useEffect(() => {
        if (isError) toast.error(message);
        if (isSuccess) toast.success(message);
        return () => dispatch(reset());
    }, [isError, isSuccess, dispatch, message]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditEmployee(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(updateEmployee(editEmployee));
        navigate("/main-page/employees");
    };

    const handleDelete = () => {
        dispatch(deleteEmployee(editEmployee.id));
        navigate("/main-page/employees");
    };

    const handleRegisterShift = (shiftId) => {
        const newShift = shifts?.find(shift => shift._id === shiftId);
        if (newShift) {
            setEditEmployee(prev => ({
                ...prev,
                shifts: [...prev.shifts, newShift._id]  // Add the new shift to the array
            }));
        }
    };

    const handleSelectEmployee = (employee) => {
        navigate(`/main-page/employees/edit-employee`, { state: employee });
    };

    const columns = [
        { label: 'Date', key: 'date' },
        { label: 'Starting Hour', key: 'startingHour' },
        { label: 'Ending Hour', key: 'endingHour' },
    ];

    const formatDate = (date) => {
        const dateObj = new Date(date);  // Convert the date to a Date object
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(dateObj);
    };

    const getShiftsData = (empShifts) => {
        // Map the shift IDs to their corresponding shift data
        return empShifts?.map(shiftId => {
            const shift = shifts?.find(s => s._id === shiftId);
            return shift ? { 
                date: formatDate(shift.date),
                startingHour: shift.startingHour,
                endingHour: shift.endingHour 
            } : null;
        }).filter(shift => shift !== null);
    };

    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={8}>
                <Container component="main">
                    <CssBaseline />
                    <Box display="flex" flexDirection="column" alignItems="center" bgcolor="white" p={3} borderRadius={2}>
                        {!selectedEmployee ? (
                            <>
                                <Typography variant="h5">Select Employee to Edit</Typography>
                                <Select
                                    labelId="employee-select-label"
                                    id="employee-select"
                                    fullWidth
                                    onChange={(e) => handleSelectEmployee(employeeData.find(emp => emp._id === e.target.value))}
                                    sx={{ mt: 2 }}
                                    value="" // Set default empty value to avoid undefined
                                >
                                    {employeeData?.map(emp => (
                                        <MenuItem key={emp._id} value={emp._id}>
                                            {emp.firstName} {emp.lastName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </>
                        ) : (
                            <>
                                <Typography component="h1" variant="h5">Edit Employee</Typography>
                                <form noValidate style={{ width: '100%', marginTop: 8 }}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        name="firstName"
                                        value={editEmployee.firstName || ""}
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
                                        value={editEmployee.lastName || ""}
                                        onChange={handleChange}
                                    />
                                    <InputLabel id="department-label">Department</InputLabel>
                                    <Select
                                        labelId="department-label"
                                        id="department"
                                        name="departmentId"
                                        fullWidth
                                        value={editEmployee.departmentId || ""}
                                        onChange={handleChange}
                                        sx={{ mb: 2 }}
                                    >
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
                                        value={editEmployee.startWork || 0}
                                        onChange={handleChange}
                                    />
                                    <InputLabel sx={{ mt: 2 }}>Shifts:</InputLabel>
                                    <Select
                                        name="shifts"
                                        fullWidth
                                        onChange={(e) => handleRegisterShift(e.target.value)}
                                        sx={{ mt: 2 }}
                                        value=""
                                    >
                                        {shifts?.map(shift => (
                                            <MenuItem key={shift._id} value={shift._id}>{formatDate(shift.date)}</MenuItem>
                                        ))}
                                    </Select>
                                    <TableComp 
                                        columns={columns} 
                                        rows={getShiftsData(editEmployee.shifts)} 
                                        sx={{ marginTop: "50px" }} 
                                    />
                                    <Box mt={2}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{
                                                backgroundColor: '#32a852',
                                                '&:hover': {
                                                    backgroundColor: '#27913b',
                                                }
                                            }}
                                            onClick={handleUpdate}
                                        >
                                            <SaveIcon sx={{ marginRight: 1 }} />
                                            Update Employee
                                        </Button>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="secondary"
                                            sx={{ mt: 1 }}
                                            onClick={handleDelete}
                                        >
                                            Delete Employee
                                        </Button>
                                    </Box>
                                </form>
                            </>
                        )}
                    </Box>
                </Container>
            </Grid>
        </Grid>
    );
}