const webpush = require('web-push');
const { PRIVATE_VAPID_KEY, PUBLIC_VAPID_KEY } = require('../env/env-dev');
const PushNotifiSubscribeModel = require('../Models/PushNotifiSubscribeSchema');

exports.subscribePushNotification = async (req, res) => {

    const subscription = req.body.subscription;
    const userId = req.body.userId;
    // Options: return the new document and create it if it doesn't exist
    const addNupdateSubscriber = await PushNotifiSubscribeModel.findOneAndUpdate({ userId },
      { userId, ...subscription }, { new: true, upsert: true } );

    if(!addNupdateSubscriber) {
      throw new Error('Subscriber not found!')
    }
    res.sendStatus(200);
    console.log('Subscriber Added');
};

exports.sendPushNotification = async (req, res) => {
    const userId = req.body.userId;
   
    const subscribedUser = await PushNotifiSubscribeModel.findOne({userId}).select("-__v -_id -userId");
    if (!subscribedUser) {
        throw new Error('Subscriber not found!')
      } 
    webpush.setVapidDetails('http://localhost:3000', PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY);
    res.sendStatus(200);
    const payload = JSON.stringify({
        title: 'Kloudrac Group',
        body: 'A New Task Assigned To You, Pls Check The List',
    });
    webpush.sendNotification(subscribedUser, payload);
}