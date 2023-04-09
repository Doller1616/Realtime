import './App.css';
import TaskViewAssign from './TaskViewAssign';
import { Grid, Typography, styled } from '@mui/material';
import EmployeeList from './EmployeeList';
import EmployeeInfo from './EmployeeInfo';
import StatusBar from './StatusBar';

import { useEffect, useState } from 'react';

const Layout = styled('div')({
  backgroundColor: '#f5f5f5',
  padding: '10px',
});

function App() {
  const [empDetails, setEmpDetails] = useState();
  const publicVapidKey = 'BJtgQXRGZg_jEcz_Y1oeJQgDUoxsagG64OrkavrACYEggWo-1bxCjXBXj8LGNB9QzUV67vBOOCs0-0qk52y2Nvw';

  const handleSelectedEmp = (details) => {
    setEmpDetails(details);
  };

  //Decoder base64 to uint8
  const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  //Send subscription to server
  const subscribe = async (subscription) => {
    return await fetch('http://localhost:5151/subscribe', {
      method: 'POST',
      body: JSON.stringify({
        subscription: subscription,
        userId: ''
      }),
      headers: {
        'content-type': 'application/json'
      }
    }).catch(function (err) {
      console.log(err);
    });
  }

  //Generate subscription object
  const getSubscriptionObject = () => {
    return navigator.serviceWorker.register('layout/service-worker-push.js')
      .then((worker) => {
        return worker.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        }).catch(function (err) {
          console.log(err);
        });
      }).catch(function (err) {
        console.log(err);
      });
  }


  useEffect(() => {
    //check if the serveice worker can work in the current browser
    // if ('serviceWorker' in navigator) {
    //   send().catch(err => console.error(err));
    // }

    //Start subscription
    if (window.Notification) {
      if (Notification.permission != 'granted') {
        Notification.requestPermission(() => {
          if (Notification.permission === 'granted') {
            getSubscriptionObject().then(subscribe)
          }
        }).catch(function (err) {
          console.log(err);
        });
      }
    }

  }, [])

  return (<Layout>
    <Typography variant='h2'> Heading </Typography>
    <Grid container spacing={2} >
      <Grid item md={12}>
        <EmployeeList activeEmp={empDetails?.id} selectedEmpCb={handleSelectedEmp} />
      </Grid>
    </Grid>
  </Layout>
  );
}

export default App;
