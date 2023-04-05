import React, { useMemo } from 'react'
import { Box, Typography } from '@mui/material';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { blue, green, grey, orange } from '@mui/material/colors';

export default function StatusBar ({empDetails}) {
  const {assignment, location, timePeriod, realTime, remark, status } = empDetails || {} ;
  // if(remark === 'delay') {
  //   return <div />
  // }
  const mode = useMemo(() => {
    return {
      bgcolor: status === 'completed' ? green['500'] : 
        (status === 'delay' ? orange['500'] : (status === 'inProgress' ? blue['500'] : grey['500'] )),
      icon: status === 'completed' ? <AddTaskOutlinedIcon /> : (status === 'delay' ? <ErrorOutlineOutlinedIcon /> : <HourglassBottomOutlinedIcon />)
    }
  }, [status]);

  return (
    <Box display='flex' gap={2} alignItems='center'
    bgcolor={mode?.bgcolor} color='white' borderRadius={5} paddingY={0.5} paddingX={1} >
       {mode?.icon}
      <Typography variant='body2'> <b>Assignment</b>: {assignment} </Typography>
      <Typography variant='body2'> <b>Current Status</b>: {realTime}   </Typography>
      <Typography variant='body2'> <b>Time Period</b>: {timePeriod}   </Typography>
      <Typography variant='body2'> <b>Department</b>: {location}   </Typography>
      <Typography variant='body2'> <b>Remark</b>: {remark}  </Typography>
    </Box>
  )
}
