const Express = require('express');
const cors = require("cors");
const Mongoose = require('mongoose');
const createRealtimeServer = require('./realtime-server');
const rootRoutes = require('./Routes/rootRoutes');
const app = Express();

const initilization = () => {
    corsConfig();
    expressParser();
    databaseConnection();
    routesConfig();
    startRealtimeServer();
    error404Handeler();
    errorHandler();
}

initilization();

function corsConfig() {
    app.use(cors());
} 

function expressParser() {
    app.use(Express.json());
}

function databaseConnection() {
    Mongoose.connect('mongodb+srv://abhi:abhi@cluster0.nbwyw.mongodb.net/realpushmap', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log('Connected to MongoDB'))
      .catch(error => console.error('Error connecting to MongoDB:', error));
};

function routesConfig() {
    app.use('/', rootRoutes)
};

function startRealtimeServer() {
    createRealtimeServer(app);
};

function error404Handeler(){
    app.use((req,res)=>{
        res.status(404).json({
            msg:'NOT FOUND',
            status: 404
        })
    })
 }
 
 function errorHandler(){
     app.use((err,req,res,next)=>{
        res.status(500).json({
            msg:err.message || "Something went wrong. Please try again later",
            status:500
        })
     })
 }


module.exports = app;
