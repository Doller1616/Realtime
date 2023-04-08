import React from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Divider, Paper, Typography } from '@mui/material';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

export default function EmployeeInfo({empDetails}) {
  const { firstName, lastName } = empDetails || {};
  return (
          <Box component={Paper} marginTop={1}>
            <Typography variant='subtitle2' lineHeight={1} display='flex' alignItems='center'
              padding={0.5} fontWeight='bold'>
              <PermIdentityOutlinedIcon color='primary' fontSize='small' /> &nbsp;
              Employee Info
            </Typography>
            <Divider />
            <Box component={Paper} padding={1} display='flex' flexWrap="wrap" gap={2}>
              <Typography variant='body2'> <b>Name</b> : {firstName} </Typography>
              <Typography variant='body2'> <b>Last Name</b> : {lastName} </Typography>
              <Typography variant='body2'> <b>Father's Name</b> : Dheeraj Suman </Typography>
              <Typography variant='body2'> <b>Phone</b> : 9920445342 </Typography>
              <Typography variant='body2'> <b>Email</b> : Amit@gmail.com </Typography>
              <Typography variant='body2'> <b>Address</b> : Govindpuram, Delhi </Typography>
              <Typography variant='body2'> <b>DOB</b> : 17 June 1994 </Typography>
              <Typography variant='body2'> <b>Date of Joining</b> : 03 March 2021 </Typography>
              <Typography variant='body2'> <b>Designation</b> : Warden </Typography>
            </Box>
          </Box>
        );
}
