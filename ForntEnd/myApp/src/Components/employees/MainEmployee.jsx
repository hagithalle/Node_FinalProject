import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Select, MenuItem, CircularProgress, Grid, Box } from '@mui/material';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { reset, getAllEmployees } from '../../dl/slices/employeesSlice';
import { getAllDepartment } from '../../dl/slices/departmentSlice';
import TableComp from "../TableComp";

export default function MainEmployee() {
    const dispatch = useDispatch();
    const { employeeData = [], isError, isSuccess, isLoading, message } = useSelector(state => state.employees);
    const { departmentData = [] ,isError: isErrorDep , isSuccess: isSuccessDep, message: messageDep} = useSelector(state => state.department);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [departmentFilter, setDepartmentFilter] = useState("");

    useEffect(() => {
        dispatch(getAllEmployees());
        dispatch(getAllDepartment());
    }, [dispatch]);

    useEffect(() => {
        setFilteredEmployees(Array.isArray(employeeData) ? employeeData : []);
    }, [employeeData]);

    useEffect(() => {
        if (isError){
            toast.error(message);
        }
        if (isSuccess) {
            toast.success(message);
        }
        if(isErrorDep)
            if(messageDep === "Not actions access")
            toast.error("Action allow to day is 0 user cannot do another action");
        return () => {
            dispatch(reset());
        };
    }, [isError, isSuccess,messageDep,isErrorDep,  dispatch]);

    const handleDepartmentChange = (event) => {
        const selectedDept = event.target.value;
        setDepartmentFilter(selectedDept);

        if (selectedDept) {
            const filtered = employeeData.filter(emp => getDepartmentName(emp.departmentId) === selectedDept);
            setFilteredEmployees(filtered);
        } else {
            setFilteredEmployees(employeeData);
        }
    };

    const getDepartmentName = (id) => {
        const department = departmentData.find(dep => dep._id === id);
        return department ? department.name : 'Unknown';
    };

    const getShiftData = (shift) => {
        const dateObj = new Date(shift.date);
        const formattedDate = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(dateObj);

        return (
            <div key={shift._id}>
                <strong>- Date:</strong> {formattedDate}:<br/> <strong>Time:</strong> {shift.startingHour} - {shift.endingHour}
            </div>
        );
    };

    const rows = filteredEmployees.map(emp => ({
        name: (
            <Link to={`edit-employee`} state={emp}>
                {`${emp.firstName} ${emp.lastName}`}
            </Link>
        ),
        department: emp.departmentId ? (
            <Link to={`../edit-department/${emp.departmentId}`} key={emp.departmentId}>
                {getDepartmentName(emp.departmentId)}
            </Link>
        ) : (
            "No Department"
        ),
        shifts: emp.shiftsData.map(shift => getShiftData(shift)),
    }));

    console.log("rows: ", rows);

    if (isLoading) {
        return <div><CircularProgress /> Loading...</div>;
    }

    const columns = [
        { label: 'Name', key: 'name' },
        { label: 'Department', key: 'department' },
        { label: 'Shifts', key: 'shifts' },
    ];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Grid container spacing={2} style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <Grid item xs={12}>
                    <TableComp columns={columns} rows={rows} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button variant="contained" color="primary" component={Link} to="/main-page/employees/new-employee">
                        New Employee
                    </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Select value={departmentFilter} onChange={handleDepartmentChange} displayEmpty fullWidth>
                        <MenuItem value="">All</MenuItem>
                        {departmentData?.map(dept => (
                            <MenuItem key={dept._id} value={dept.name}>{dept.name}</MenuItem>
                        ))}
                    </Select>
                </Grid>
            </Grid>
        </Box>
    );
};