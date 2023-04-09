import { Box, Dialog, Divider, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect, useMemo } from 'react'
import employeeList from './employeelist.json'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TaskViewAssign from './TaskViewAssign';
import Dialogbox from './Dialogbox';
import CurrentTasks from './CurrentTasks';
import { BASEURL } from './apiConfig';
import io from 'socket.io-client';
const socket = io('http://localhost:4000');
let count = 0;

export default function EmployeeList() {
  const [open, setOpen] = React.useState(false);
  const [emp, setEmp] = React.useState({});
  const [employees, setEmployees] = React.useState([]);
  const [selectedValue, setSelectedValue] = React.useState();

  const handleClickOpen = (timestamp, details) => {
    setEmp(details);
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  // const fetchEmployees = useCallback(async () => {
  //   const res = await fetch(`${BASEURL}/employees`);
  //   const data = await res.json();
  //   setEmployees(data?.employees);
  // }, [])


  React.useEffect(() => {
    // fetchEmployees()
    socket.on('employee-list', (data) => {
      setEmployees(data?.employees);
    });

    socket.on('connect_error', (error) => {
      if (error.message === 'xhr poll error' || error.message === 'polling error') {
        console.error('Error connecting to server:', error.message);
      } else {
        console.error('Error connecting to server:', error);
      }
      count++;
      (count == 5) && socket.disconnect()
    });

    return () => {
      employees.length && socket.disconnect()
    }
  }, [])

  const CombineEmpDetailsAndTaskAssign = ({ emp }) => {
    return (
      <Grid container spacing={1} marginTop={1} component={Paper} padding={1}>
        <Grid item md={3}>
          <EmployeeCardView employee={emp} />
        </Grid>
        <Grid item md={9}>
          <TaskViewAssign employee={emp} fn={handleClickOpen} />
          <CurrentTasks tasks={emp?.tasks || []} />
        </Grid>
      </Grid>
    )
  }

  return (
    <Box>
      <Box display="flex" gap={1} component={Paper} padding={1} width="50%">
        <FormControl size='small' sx={{ width: '200px' }} >
          <InputLabel id="demo-simple-select-label">Shift</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Shift"
          // onChange={handleChange}
          >
            <MenuItem value={10}>Day</MenuItem>
            <MenuItem value={20}>Evening</MenuItem>
            <MenuItem value={30}>Night</MenuItem>
          </Select>
        </FormControl>
        <TextField
          size='small'
          fullWidth
          InputProps={{
            endAdornment: <SearchOutlinedIcon fontSize='small' color='primary' />,
          }}
        />
      </Box>
      {employees?.map((emp) =>
        <CombineEmpDetailsAndTaskAssign key={emp?.id} emp={emp} />)}

      <Dialogbox
        emplID={emp?.emplID}
        selectedValue={selectedValue}
        // refreshTasks={fetchEmployees}
        open={open}
        onClose={handleClose}
      />
    </Box>
  )
}


const EmployeeCardView = ({ employee }) => {
  const { imgUrl, firstName, lastName, position, location, phone,
    emplID, id } = employee || {};

  return (
    <Box component={Paper} display='flex' alignItems='center' padding={1} overflow='hidden'
      sx={{ cursor: 'pointer' }} >
      <Box display='flex' gap={1}>
        <div style={{ width: '50%' }}>
          <img src={imgUrl} alt='user' width="100%" style={{ borderRadius: '10px' }} />
        </div>
        <div style={{ width: '50%', padding: '8px' }}>
          <Typography variant='body1' fontWeight="bold" noWrap overflow='hidden'>
            {emplID}
          </Typography>
          <Typography variant='body1' lineHeight={1} noWrap overflow='hidden'>
            {firstName} {lastName} <br />
            <Typography variant='caption' lineHeight={1}><i>({position})</i></Typography>
          </Typography>
          <Box marginTop={2}>
            <Typography variant='caption' noWrap overflow='hidden'>
              <LocalPhoneOutlinedIcon fontSize="inherit" color='primary' /> : {phone}
            </Typography>
            <Typography variant='caption' noWrap overflow='hidden'>
              <LocationOnOutlinedIcon fontSize="inherit" color='primary' /> : {location}
            </Typography>
          </Box>
        </div>
      </Box>
    </Box>
  );
};
