const Router = require('express').Router();
const addOnController = require('../Controllers/addOnController')


const initilization = () =>  {
    postRoutes()
};
initilization();


function postRoutes() {
    Router.post('/subscribe', addOnController.subscribePushNotification);
    Router.post('/send-notification', addOnController.sendPushNotification);
}

module.exports = Router;