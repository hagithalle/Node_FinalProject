import { useState, useEffect } from "react";
import { Container, Typography, TextField, Box, CssBaseline, InputLabel, Select, MenuItem, Button ,Grid} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateEmployee, getAllEmployees } from "../../dl/slices/employeesSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { deleteDepartment, reset, updateDepartment } from "../../dl/slices/departmentSlice";
import SaveIcon from '@mui/icons-material/Save';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllUsers } from "../../dl/slices/usersSlice";

export default function EditDepartment() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { departmentData, isError, isSuccess, message } = useSelector(state => state.department);
    const { employeeData = [] } = useSelector(state => state.employees);
    const { users } = useSelector(state => state.users);

    const [selectedDepartment, setSelectedDepartment] = useState(false);
    const [availableEmployees, setAvailableEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [editDepartment, setEditDepartment] = useState({
        id: "",
        name: "",
        manager: "",
        employeesList: []
    });

    useEffect(() => {
        if (location.state) {
            setSelectedDepartment(true);
            const { _id, name, manager, employeesList } = location.state;
            setEditDepartment({ id: _id, name: name || "", manager: manager || "", employeesList: employeesList || [] });
            dispatch(getAllEmployees());
        }
        dispatch(getAllUsers());
    }, [dispatch, location.state]);

    useEffect(() => {
        const filteredEmployees = employeeData.filter(
            emp => emp.departmentId !== editDepartment.id)
        console.log("x")
        setAvailableEmployees(filteredEmployees);
    }, [editDepartment.id, employeeData]);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditDepartment(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEmployeeSelect = (e) => {
        setSelectedEmployee(e.target.value);
    };

    const addEmployeeToList = () => {
        if (selectedEmployee) {
            const employee = employeeData.find(emp => emp._id === selectedEmployee);
            setEditDepartment(prev => ({
                ...prev,
                employeesList: [...prev.employeesList, employee]
            }));

            setAvailableEmployees(prev => prev.filter(emp => emp._id !== selectedEmployee));
            console.log(`Employee ${selectedEmployee} was added`);
            setSelectedEmployee("");
            console.log("availableEmployees:",availableEmployees)
        }
    };
        // Logs changes to editDepartment in the console
    useEffect(() => {
        console.log("Updated editDepartment:", editDepartment);
    }, [editDepartment]);


    const handleUpdateDepartment = async (e) => {
        e.preventDefault();
        const { employeesList, ...departmentData } = editDepartment;
        dispatch(updateDepartment(departmentData));
        editDepartment.employeesList.forEach(emp => {
            dispatch(updateEmployee({
                id: emp._id,
                departmentId: location?.state?._id,
            }));
        });
        await dispatch(reset());
        navigate("../");
    };

    const handleSelectDepartment = (department) => {
        navigate(`/main-page/departments/edit-department`, { state: department });
    };

    const handleDeleteDepartment = () => {
        dispatch(deleteDepartment(editDepartment._id));
        navigate('/main-page/departments');
    };

    return (
        
        <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={8}>
            <Container component="main">
            <Box display="flex" flexDirection="column" alignItems="center" bgcolor="white" p={3} borderRadius={2}>
            {!selectedDepartment ? (
                <>
                    <Typography variant="h5">Select Department to Edit</Typography>
                    <Select
                        labelId="department-select-label"
                        id="department-select"
                        fullWidth
                        onChange={(e) => handleSelectDepartment(departmentData.find(dep => dep._id === e.target.value))}
                        sx={{ mt: 2 }}
                        value=""
                    >
                        {departmentData?.map(dep => (
                            <MenuItem key={dep._id} value={dep._id}>
                                {dep.name}
                            </MenuItem>
                        ))}
                    </Select>
                </>
            ) : (
                <>
                    <Typography component="h1" variant="h5">Edit Department</Typography>
                    <form noValidate style={{ width: '80%', marginTop: 8 }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            value={editDepartment.name}
                            onChange={handleChange}
                            autoFocus
                        />
                        <InputLabel id="manager-label">Manager:</InputLabel>
                        <Select
                            labelId="manager-label"
                            id="manager"
                            name="manager"
                            fullWidth
                            value={editDepartment.manager || ""}
                            onChange={handleChange}
                        >
                            {users?.map(user => (
                                <MenuItem key={user._id} value={user._id}>{user.fullName}</MenuItem>
                            ))}
                        </Select>

                        <InputLabel id="employee-list-label" style={{ marginTop: 16 }}>Add Employee:</InputLabel>
                        <Box sx={{ display: "flex" }}>
                            <Select
                                labelId="employee-list-label"
                                id="employee"
                                fullWidth
                                value={selectedEmployee}
                                onChange={handleEmployeeSelect}
                            >
                                {availableEmployees?.map(emp => (
                                    <MenuItem key={emp._id} value={emp._id}>{`${emp.firstName} ${emp.lastName}`}</MenuItem>
                                ))}
                            </Select>
                            <Button variant="contained" color="primary" onClick={addEmployeeToList}>+</Button>
                        </Box>
                        <Box mt={2}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={handleUpdateDepartment}
                                startIcon={<SaveIcon />}
                                style={{ backgroundColor: '#4CAF50' }}
                            >
                                Update Department
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                color="secondary"
                                sx={{ mt: 1 }}
                                onClick={handleDeleteDepartment}
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