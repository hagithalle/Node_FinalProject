import { Typography ,Box, Grid} from "@mui/material";
import TableComp from "../Components/TableComp";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllUsers } from "../dl/slices/usersSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Users(){
    const dispatch = useDispatch()
    const  {users=[], isSuccess, isError, isLoading, message } = useSelector(state => state.users)

    useEffect(()=>{
        dispatch(getAllUsers())
    },[dispatch])

    useEffect(() => {
        if (isError) {
            if(message === "Not actions access")
                toast.error("Action allow to day is 0 user cannot do another action");
            else
          toast.error(message);
        }
    
       /* if (isSuccess) {
          toast.success(message);
        }*/
    
        //if (employeeShiftSuccess) toast.success(employeeShiftMessage);
    }, [isError, isSuccess, message]);

    console.log("users:", users)
    const rows = users?.map(user => ({
        userName: user.userName, // Format the date as "November 4, 2024"
        numOfActions: user.numOfActions, // Format the starting hour
        actionsAllowed: user.actionsAllowed, // Format the ending hour
        
    }));

    const columns = [
        { label: 'UserName', key: 'userName' },
        { label: 'Maximum actions allwed', key: 'numOfActions' },
        { label: 'CURRENT actions allowed today', key: 'actionsAllowed' },
      ];

     // console.log("rows: ", rows, "colums:", columns)
    return( 
        <Box 
        sx={{ 
            borderRadius: '8px', 
            padding: '20px', 
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'column', // Stack children vertically
            alignItems: 'center', // Center horizontally
            width: { xs: '90%', sm: '80%' }, // Responsive width
            margin: 'auto', // Center the Box in the page
            height: '80vh', // Set height to 80% of viewport height
            overflowY: 'auto', // Enable scrolling if content exceeds height
        }}
    >
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <Typography variant="h5">Users:</Typography>
        <Grid container spacing={2} style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Grid item xs={12}>
                <TableComp columns={columns} rows={rows} />
            </Grid>
        </Grid>
        </Box>
        </Box>

)}