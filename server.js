//server.js
const express = require('express');
const path = require('path');
const Stopwatch = require('timer-stopwatch');
const WebSocket = require('ws');

const app = express();
const expressWs = require('express-ws')(app);
const timer = new Stopwatch(20 * 60 * 1000, {refreshRateMS: 1000})
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.ws('/', (ws, req) => {
  timer.onTime(function (){
    if(ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({time: timer.ms, status: timer.state}), function(error){
        if(!error) {
          return
        }; 
        console.log(error);
      })
    }
  });
  ws.on('message', message => {
    if (message === 'reset') {
      timer.reset();
    } else if (message === 'pause-toggle') {
      timer.startstop();
    } else {
      console.log("unknown message: " + message)
    }
  })
})

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(process.env.PORT || 3000);

