import React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box, Button, Dialog, DialogTitle, TextField } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import { BASEURL } from './apiConfig';


function Dialogbox(props) {
    const { onClose, selectedValue, open, refreshTasks, emplID } = props;
    const [value, setValue] = React.useState({
        from: dayjs('2022-04-17T15:30'),
        to: dayjs('2022-04-17T16:30'),
        assignment: ''
    });

    const handleClose = () => {
        onClose(selectedValue);
    };

    const onChangeTime = (name, value) => {
        setValue((pre) => ({ ...pre, [name]: value }));
    }

    const getHoursBetweenTimes = (startTime, endTime) => {

        const startDate = new Date(`2000-01-01T${startTime}:00`);
        const endDate = new Date(`2000-01-01T${endTime}:00`);

        const timeDiff = endDate.getTime() - startDate.getTime();
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        return hoursDiff;
    }

    const onClickAssig = async () => {
        const f = new Date(value.from);
        const t = new Date(value.to);
        const data = {
            emplID,
            from : `${f.getHours()}:${f.getMinutes()}`,
            to :`${t.getHours()}:${t.getMinutes()}`,
            assignment: value.assignment,
            timePeriod : `${getHoursBetweenTimes(`${f.getHours()}:${f.getMinutes()}` , `${t.getHours()}:${t.getMinutes()}`)} hr`,
            status: "not started",
            remark: "",
        };
        const status = await fetch(`${BASEURL}/task-add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        // refreshTasks();
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle sx={{ p: 1.5 }}>Task Assignment</DialogTitle>
            <Box padding={1}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimePicker', 'TimePicker']}>
                        <TimePicker
                            label="From"
                            value={value.from}
                            onChange={(newValue) => onChangeTime('from', newValue)}
                        />
                        <TimePicker
                            label="To"
                            value={value?.to}
                            onChange={(newValue) => onChangeTime('to', newValue )}
                        />
                    </DemoContainer>
                </LocalizationProvider>
                <br />
                <TextField
                    placeholder='Assignment'
                    fullWidth
                    onChange={(e) => onChangeTime('assignment', e.target.value)}
                />

                <Box display='flex' justifyContent='right' padding={2}>
                    <Button variant='contained' onClick={onClickAssig}> Assign </Button>
                </Box>
            </Box>
        </Dialog>
    );
}

export default Dialogbox;
