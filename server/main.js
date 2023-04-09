const Server = require('./server');
const ngrok = require('ngrok');
// const { NGROK_AUTH } = require('./env/env-dev');
const PORT = 5151;

Server.listen(PORT, async () => {
    // const url = await ngrok.connect({  addr: PORT, authtoken: NGROK_AUTH });
    console.log("Local Rest Server:", `http://localhost:${PORT}`);
    // console.log("Global Socket Server:", `wss://${url.slice(8, url.length)}`);
});
