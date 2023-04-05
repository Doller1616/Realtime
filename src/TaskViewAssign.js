import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Divider, Paper, Typography } from '@mui/material';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';

const shiftI = [
  '5:00 AM',
  '5:30 AM',
  '6:00 AM',
  '6:30 AM',
  '7:00 AM',
  '7:30 AM',
  '8:00 AM',
  '8:30 AM',
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 AM',
];

export default function TaskViewAssign() {
  return (
    <Box component={Paper} marginTop={1}>
      <Typography variant='subtitle2' lineHeight={1} display='flex' alignItems='center'
        padding={0.5} fontWeight='bold'>
        <ChecklistOutlinedIcon color='primary' fontSize='small' /> &nbsp;
        Timestamp
      </Typography>
      <Divider />
      <Box component={Paper} padding={1} sx={{overflowX: 'auto'}}>
        <Stepper activeStep={2} alternativeLabel>
          {shiftI.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Box>
  );
}
