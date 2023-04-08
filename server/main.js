const express = require('express');
const cors = require("cors");
const ngrok = require('ngrok');
const webpush = require('web-push');
const app = express();
const PORT = 5151;
const NGROK_AUTH = '25EqWHVn2o4EaXW3udGsyagA8wg_4LwKEPfSdFvT8vy2jUN...'; // abhardwaj1@kloudrac.com (https://ngrok.com)
const createRealtimeServer = require('./realtime-server');
const { PRIVATE_VAPID_KEY, PUBLIC_VAPID_KEY } = require('./env/env-dev');

app.use(cors());
app.use(express.json());
createRealtimeServer(app);

//Subscriptions
app.post('/subscribe', (req, res) => {
    const subscription = req.body.subscription;
    const userId = req.body.userId;
    console.dir(subscription);
    console.log('userId: ', userId)
    //TODO: Store subscription keys and userId in DB
    webpush.setVapidDetails(
        'http://localhost:3000', 
        PUBLIC_VAPID_KEY, 
        PRIVATE_VAPID_KEY
    );
    res.sendStatus(200);
    const payload = JSON.stringify({
        title: 'Title',
        body: 'This is my body',
    });
    webpush.sendNotification(subscription, payload);
});


app.listen(PORT, async () => {
    // const url = await ngrok.connect({  addr: PORT, authtoken: NGROK_AUTH });
    console.log("Local Rest Server:", `http://localhost:${PORT}`);
    // console.log("Global Socket Server:", `wss://${url.slice(8, url.length)}`);
});
