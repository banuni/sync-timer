//server.js
const express = require('express');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');
const Stopwatch = require('timer-stopwatch');


const port = process.env.PORT || 8080;

const app = express();
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);

//websocketStuff
const websocketapp = express();
const server = http.createServer(websocketapp);

const wss = new WebSocket.Server({ server });
const timer = new Stopwatch(20 * 60 * 1000, {refreshRateMS: 1000})

wss.on('connection', (ws) => {
  timer.onTime(function (){ ws.send(JSON.stringify({time: timer.ms}))})
  ws.on('message', message => {
    if (message === 'pause') {
      timer.stop();
    } else if (message === 'reset') {
      timer.reset();
      timer.start();
    } else if (message === 'pause-toggle') {
      timer.startstop();
    } else {
      console.log("unknown message: " + message)
    }
  })
})
server.listen(3000, () =>{
  console.log("started ws server on :3000")
})

