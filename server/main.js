const Server = require('./server');
const ngrok = require('ngrok');
const PORT = 5151;
const NGROK_AUTH = '25EqWHVn2o4EaXW3udGsyagA8wg_4LwKEPfSdFvT8vy2jUN92'; // abhardwaj1@kloudrac.com (https://ngrok.com)

Server.listen(PORT, async () => {
    // const url = await ngrok.connect({  addr: PORT, authtoken: NGROK_AUTH });
    console.log("Local Rest Server:", `http://localhost:${PORT}`);
    // console.log("Global Socket Server:", `wss://${url.slice(8, url.length)}`);
});
