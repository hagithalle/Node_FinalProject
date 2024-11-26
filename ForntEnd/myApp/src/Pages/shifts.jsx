import { useEffect, useState } from 'react';
import { getAllShifts, reset, createNewShift } from "../dl/slices/shiftSlice";
import { Button, Grid, InputLabel, Box , Typography} from '@mui/material';
import TableComp from "../Components/TableComp";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from 'dayjs';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { format } from 'date-fns';
import EditShift from '../Components/EditShift';
import { Outlet } from "react-router-dom";


export default function Shifts() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { shiftsData = [], isSuccess, isError, isLoading, message } = useSelector(state => state.shifts);
    const [newShift, setNewShift] = useState({
        date: dayjs().format('YYYY-MM-DD'), // or an empty string
        startinghour: dayjs().format('h:mm a'),
        endinghour:  dayjs().format('h:mm a'),
    });

    useEffect(() => {
        dispatch(getAllShifts());
        // Check the response in the Redux store
       // console.log("shiftsData:", shiftsData);
    }, [dispatch]);

    useEffect(() => {
        if (isError){
            if(message === "Not actions access")
                toast.error("Action allow to day is 0 user cannot do another action");
            else{
                toast.error(message);
            }
      
         }
        //if (isSuccess) toast.success(message);
        return () => {
            dispatch(reset());
        };
    }, [isError, isSuccess, dispatch, message]);

    const rows = shiftsData?.map(s => ({
        date: format(new Date(s.date), 'MMMM d, yyyy'), // Format the date as "November 4, 2024"
        startingHour: format(new Date(`1970-01-01T${s.startingHour}:00`), 'h:mm a'), // Format the starting hour
        endingHour: format(new Date(`1970-01-01T${s.endingHour}:00`), 'h:mm a'), // Format the ending hour
        edit: (
            <Button   sx={{
                backgroundColor: '#32a852',
                color: 'white', // Set text color to white
                '&:hover': {
                    backgroundColor: '#27913b',
                }
            }}
            onClick={() => navigateToEditShift(s)}>
                Edit
            </Button>
        )
    }));

    const columns = [
        { label: 'Date', key: 'date' },
        { label: 'Starting Hour', key: 'startingHour' },
        { label: 'Ending Hour', key: 'endingHour' },
        { label: 'Edit', key: 'edit' },
      ];

    const handleAddShift = async (e) => {
        e.preventDefault();
            await dispatch(createNewShift(newShift));
    
            dispatch(getAllShifts());
            
     
    };

    const changeHandler = (e) => {
        setNewShift((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };

    

const navigateToEditShift = (shift) => {
    navigate(`edit-shift/${shift._id}` );
};

    return (
        <Box 
            sx={{
                padding: '20px', 
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column', // Stack children vertically
                alignItems: 'center', // Center horizontally
                width: { xs: '90%', sm: '80%' }, // Responsive width
                margin: 'auto' // Center the Box in the page
            }}
        >
        <Grid container spacing={2} style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Grid item xs={12}>
            <Typography variant="h5" sx={{textAlign:"center", marginBottom:"20px"}}>Shifts:</Typography>
                <TableComp columns={columns} rows={rows} />
            </Grid>
            <Grid item xs={12} sx={{ marginTop: "50px"}}>
                <Box sx={{ display: "flex",
                    gap: 2,
                    maxWidth: "50%",
                    alignItems: "center",
                    justifyContent: "center", 
                    mx: "auto" 
                    }}>
                    <div> <InputLabel>Date:</InputLabel>
                <input
            type="date"
            className="w-48 h-16"
            name="date"
            id="shiftDate"
            onChange={changeHandler}
          />
          </div>
          <div>
          <InputLabel>Starting Hour:</InputLabel>
         
            <input
            type="time"
            name="startingHour"
            id="startingHour"
            onChange={changeHandler}
          />
           </div>
          <div>
          <InputLabel>Ending Hour:</InputLabel>
           <input
            type="time"
            name="endingHour"
            id="endingHour"
            onChange={changeHandler}
          />
          </div>
                    <Button  type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{
                                                backgroundColor: '#32a852',
                                                '&:hover': {
                                                    backgroundColor: '#27913b',
                                                }
                                            }}
                                            onClick={handleAddShift}>Add</Button>
                </Box>
            </Grid>
        </Grid>
        </Box>
    );
}