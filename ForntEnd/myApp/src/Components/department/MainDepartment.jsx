import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, CircularProgress, Grid } from '@mui/material';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { reset, getAllEmployees } from '../../dl/slices/employeesSlice';
import { getAllDepartment } from '../../dl/slices/departmentSlice';
import TableComp from "../TableComp";
import { getAllUsers } from "../../dl/slices/usersSlice";

export default function MainDepartment() {
    const dispatch = useDispatch();
    const { employeeData = [], isError, isSuccess, isLoading, message } = useSelector(state => state.employees);
    const { departmentData = [] ,isError: isErrorDep , isSuccess: isSuccessDep, message: messageDep} = useSelector(state => state.department);
    const { users = [] } = useSelector(state => state.users);
    const [filteredEmployees, setFilteredEmployees] = useState([]);

    useEffect(() => {
        dispatch(getAllEmployees());
        dispatch(getAllDepartment());
        dispatch(getAllUsers());  // Added parentheses to invoke function
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
    }, [isError,isErrorDep, messageDep, isSuccess, dispatch]);

    const getDepartmentName = (id) => {
        const department = departmentData.find(dep => dep._id === id);
        return department ? department.name : 'Unknown';
    };

    const getMangerName = (managerId) => {
        console.log("departmentData:",departmentData)
        console.log("managerId: ", managerId)
        const manager = users.find(user => user._id === managerId);
        return manager ? manager.fullName : 'Unknown';
    };

    const getEmployeesListByDepartment = (departmentId) => {
        const employeeList = employeeData.filter(emp => emp.departmentId === departmentId);
        return (
            <div>
                {employeeList.map(emp => (
                    <Link 
                        key={emp._id} 
                        to={"../employees/edit-employee"} 
                        state={emp}
                        style={{ display: "block", marginBottom: "4px" }}
                    >
                        {`${emp.firstName} ${emp.lastName}`}
                    </Link>
                ))}
            </div>
        );
    };

    const rows = departmentData?.map(dep => ({
        
        name: <Link to={"edit-department"} state={dep}>{dep.name}</Link>,
        manager: getMangerName(dep.manager),
        employees: getEmployeesListByDepartment(dep._id)
        
    }));

    if (isLoading) {
        return <div><CircularProgress /> Loading...</div>;
    }

    const columns = [
        { label: 'Name', key: 'name' },
        { label: 'Manager', key: 'manager' },
        { label: 'Employees', key: 'employees' },
      ];

    return (
        <Grid container spacing={2} style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Grid item xs={12}>
                <TableComp columns={columns} rows={rows} sx={{maxWidth:"70%"}}/>
            </Grid>
            <Grid item xs={12} md={6} justifyContent="flex-end">
                <Button variant="contained" color="primary" component={Link} to="/main-page/departments/new-department">
                    New Department
                </Button>
            </Grid>
        </Grid>
    );
}