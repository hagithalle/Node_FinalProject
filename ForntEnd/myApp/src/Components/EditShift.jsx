import { Container, CssBaseline, InputLabel, Box, Select, MenuItem, Button, Typography, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { addShiftToEmployee, getAllEmployees } from "../dl/slices/employeesSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAllShifts , updateShift} from "../dl/slices/shiftSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditShift() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { shiftId } = useParams();

    const { employeeData, isError, isSuccess, message } = useSelector(state => state.employees);
    const [availableEmployees, setAvailableEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const { shiftsData } = useSelector(state => state.shifts);
    const [editShift, setEditShift] = useState({
        _id: shiftId,
        date: "",
        startingHour: "",
        endingHour: "",
        employeeList: []
    });

    useEffect(() => {
        dispatch(getAllShifts());
        dispatch(getAllEmployees());
    }, [dispatch]);

    useEffect(() => {
        if (shiftsData && shiftsData.length > 0) {
            const currentShift = shiftsData.find(s => s._id === shiftId);
            if (currentShift) {
                setEditShift({
                    _id: shiftId,
                    date: currentShift.date ? currentShift.date.slice(0, 10) : "",
                    startingHour: currentShift.startingHour || "",
                    endingHour: currentShift.endingHour || "",
                    employeeList: currentShift.employeeList || []
                });
            }
        }
    }, [shiftsData, shiftId]);

    // Debugging: check for state updates
    useEffect(() => {
        console.log("Updated editShift:", editShift);
    }, [editShift]);

    // Debugging: Log employeeData
    useEffect(() => {
        console.log("employeeData:", employeeData);
    }, [employeeData]);

    useEffect(() => {
        console.log("Updated employeeList:", editShift.employeeList);
    }, [editShift.employeeList]);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess) {
            toast.success(message);
        }
    }, [isError, isSuccess, message]);


    useEffect(() => {
        if (employeeData && employeeData.length > 0) {
            const employeeList = employeeData.filter(emp => !emp.shifts.includes(editShift._id)); // Filter out those already assigned
            console.log("Filtered employeeList:", employeeList);  // Debugging: Check the filtered list
            setAvailableEmployees(employeeList);
        }
    }, [employeeData, editShift._id, editShift.employeeList]); // Add `editShift.employeeList` to dependencies to re-run this when the list changes

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setEditShift(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEmployeeSelect = (e) => {
        setSelectedEmployee(e.target.value || "");
    };

    const addEmployeeToList = () => {
        if (selectedEmployee) {
            const employee = employeeData.find(emp => emp._id === selectedEmployee);
            setEditShift(prev => ({
                ...prev,
                employeeList: [...prev.employeeList, employee]
            }));
            setAvailableEmployees(prev => prev.filter(emp => emp._id !== selectedEmployee));
            setSelectedEmployee("");  // Clear selection
        }
    };

    const handleUpdateShift = async (e) => {
        e.preventDefault();  // Prevent default form submission
        const { employeeList, ...shiftDetails } = editShift;
   
        console.log("shiftDetails:", shiftDetails)
        dispatch(updateShift(shiftDetails));  // Update the shift details first
        console.log("employeeList:", employeeList)
        // Dispatch action for each employee in the employeeList to assign them to the shift
        for (const emp of employeeList) {
            console.log("emp._id: ", emp._id,"shiftId:", shiftDetails._id)
             dispatch(addShiftToEmployee({ id: emp._id, shiftId: shiftDetails._id}));  // Assign shift to each employee
        }
   
        navigate("/main-page/shifts");  // Redirect after the update
    };

    const styles = {
        container: {
            minHeight: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
        },
        box: {
            border: '5px solid #ccc',
            borderRadius: '8px',
            padding: '20px',
            width: '100%',
            height: '80vh',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        input: {
            width: '100%',
            height: '48px',
            fontSize: '16px',
        },
        select: {
            width: '200px', // Adjust this width as needed
        },
        buttonGroup: {
            display: 'flex',
            gap: 1,
            marginTop: 2,
        },
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={12} md={8}>
                <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <Box display="flex" flexDirection="column" alignItems="center" bgcolor="white" p={3} borderRadius={2}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Edit Shift
                        </Typography>
                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: "center" }}>
                            <div style={{ paddingTop: "40px" }}>
                                <InputLabel>Date:</InputLabel>
                                <input
                                    type="date"
                                    style={styles.input}
                                    name="date"
                                    onChange={changeHandler}
                                    value={editShift.date || ""}
                                />
                            </div>
                            <div style={{ paddingTop: "40px" }}>
                                <InputLabel>Starting Hour:</InputLabel>
                                <input
                                    type="time"
                                    style={styles.input}
                                    name="startingHour"
                                    onChange={changeHandler}
                                    value={editShift.startingHour || ""}
                                />
                            </div>
                            <div style={{ paddingTop: "40px" }}>
                                <InputLabel>Ending Hour:</InputLabel>
                                <input
                                    type="time"
                                    style={styles.input}
                                    name="endingHour"
                                    onChange={changeHandler}
                                    value={editShift.endingHour || ""}
                                />
                            </div>

                            <InputLabel id="employee-list-label" style={{ marginTop: 16 }}>Add Employee:</InputLabel>
                            <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
                                <Select
                                    labelId="employee-list-label"
                                    id="employee"
                                    fullWidth
                                    value={selectedEmployee || ""}
                                    onChange={handleEmployeeSelect}
                                    sx={styles.select}
                                >
                                    {availableEmployees?.map(emp => (
                                        <MenuItem key={emp._id} value={emp._id}>
                                            {`${emp.firstName} ${emp.lastName}`}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <Button variant="contained" color="primary" onClick={addEmployeeToList}>+</Button>
                            </Box>
                        </Box>
                        <Box sx={{ marginTop: 2 }}>
                            <Typography variant="h6">Assigned Employees:</Typography>
                            <ul>
                                {editShift.employeeList.map(emp => (
                                    <li key={emp._id}>{`${emp.firstName} ${emp.lastName}`}</li>
                                ))}
                            </ul>
                        </Box>

                        <Box sx={{ display: "flex", gap: 1, marginTop: 2 }}>
                            <Button onClick={handleUpdateShift} variant="contained" color="primary">
                                Save Shift
                            </Button>
                            <Button variant="contained" color="secondary" onClick={() => navigate("/main-page/shifts")}>
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Grid>
        </Grid>
    );
}