import { Box, Paper } from '@mui/material'
import { blue, green, grey, orange } from '@mui/material/colors'
import React from 'react'

export default function CurrentTasks(props) {
    const colorPicker = {
        inProgress: blue['500'],
        completed: green['500'],
        delay: orange['500']
    }
    return (<Box display='flex' gap={1}>
        {props?.tasks?.map(({id, ...task}) => (
            <Box key={id} component={Paper} color='white' bgcolor={colorPicker[task.status] || grey['500']} fontWeight='bold'
                fontSize={12} sx={{ maxWidth: "140px", mt: 1 }} display='flex'
                flexDirection='column' gap={0.2} padding={0.5}
            >
                <small> {task?.assignment} </small>
                <small> {task?.from} to {task?.to} ({task?.timePeriod})</small>
                <small> {task.status}</small>
            </Box>
        ))}
    </Box>)
}
