const Mongoose = require('mongoose');

const pushNotifiSubscribeSchema = new Mongoose.Schema({

    userId :  String,
    endpoint:  String,
    expirationTime: String,
    keys: {
        p256dh : String,
        auth : String
    }

});

module.exports = Mongoose.model('pushNotifiSubscribe', pushNotifiSubscribeSchema)