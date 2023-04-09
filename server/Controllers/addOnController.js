const webpush = require('web-push');
const { PRIVATE_VAPID_KEY, PUBLIC_VAPID_KEY } = require('../env/env-dev');

exports.subscribePushNotification = (req, res) => {

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
        title: 'Kloudrac Group',
        body: 'A New Task Assigned To Pls Check The List',
    });
    webpush.sendNotification(subscription, payload);

};