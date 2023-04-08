import './App.css';
import TaskViewAssign from './TaskViewAssign';
import { Grid, Typography, styled } from '@mui/material';
import EmployeeList from './EmployeeList';
import EmployeeInfo from './EmployeeInfo';
import StatusBar from './StatusBar';

import { useState } from 'react';

const Layout = styled('div')({
     backgroundColor: '#f5f5f5',
     padding: '10px',
});

function App() {
  const [empDetails, setEmpDetails] = useState();
  const handleSelectedEmp = (details) => {
    setEmpDetails(details);
  };

  return (<Layout>
    <Typography variant='h2'> Heading </Typography>
    <Grid container spacing={2} >
    <Grid item md={12}>
      <EmployeeList activeEmp={empDetails?.id} selectedEmpCb={handleSelectedEmp} />
    </Grid>

    {/* <Grid item md={9}>
      <StatusBar empDetails={empDetails} /> */}
      {/* <EmployeeInfo empDetails={empDetails} /> */}
      {/* <TaskViewAssign empDetails={empDetails} />
    </Grid> */}
     

    </Grid>
    </Layout>
  );
}

export default App;
