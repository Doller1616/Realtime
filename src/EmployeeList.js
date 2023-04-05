import { Box, Divider, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import React, { useMemo } from 'react'
import employeeList from './employeelist.json'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

export default function EmployeeList({ activeEmp, selectedEmpCb }) {


  return (
    <Box component={Paper} padding={1}>
      <Grid container spacing={1} marginY={1}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <FormControl size='small' fullWidth>
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
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField 
           size='small' 
           fullWidth 
           InputProps={{
            endAdornment: <SearchOutlinedIcon fontSize='small' color='primary' />,
          }}
           />
        </Grid>
      </Grid>
      <Divider variant='fullWidth' />
      <Box marginTop={1}>
        {employeeList.employees?.map((emp) => 
         <EmployeeCardView key={emp?.id} employee={emp} activeEmp={activeEmp} 
           selectedEmpCb={selectedEmpCb} />)}
      </Box>
    </Box>
  )
}


const EmployeeCardView = ({ employee, selectedEmpCb, activeEmp}) => {
  const { imgUrl, firstName, lastName, position, location, phone,
    emplID, id } = employee || {};
    const isActive = useMemo(() => {
        return activeEmp === id
    }, [activeEmp, id]);

  const onClickCard = () => {
    selectedEmpCb(employee);
  }

  return (
    <Box component={Paper} display='flex' alignItems='center' padding={1} marginY={1} overflow='hidden'
    onClick={onClickCard} sx={{cursor: 'pointer'}} >
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
     { isActive && <ArrowForwardIosOutlinedIcon color='action' /> } 
    </Box>
  );
};
