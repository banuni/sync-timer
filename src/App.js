import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';

const buttonStyle =  {display: 'inline', margin: '10px'}

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  let ws = useRef(null);
  useEffect(() => {
    const protocol = window.location.protocol === 'http:' ? 'ws:' : 'wss:';
    const port = window.location.port ? `:${window.location.port}` : '';
    const conn = new WebSocket(`${protocol}//${window.location.hostname}${port}`)
    conn.onmessage = ev => {
      console.log(ev.data);
      setIsRunning(JSON.parse(ev.data).status === 1)
      return setTime(JSON.parse(ev.data).time);
    }
    ws.current = conn;
  }, [])
  const minutes = Math.floor((time/1000/60) << 0);
  const seconds = ((time % 60000) / 1000).toFixed(0);
  const secondsDisplay = (seconds < 10 ? '0' : '') + seconds;
  const textColor = minutes < 1 ? 'red' : minutes < 3 ? 'orange' : 'white';
  if (!ws) {
    return <div>can't connect...</div>
  }
  return (
    <>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />
      <header className="App-header">
        <div style={{ fontSize: '300px', color: textColor}}>{minutes}:{secondsDisplay}</div>
        <div style={{display: 'inline-block'}}>
          <div style={buttonStyle}>
            <Button onClick={() => {
              ws.current.send('reset');
            }}>Reset</Button>
          </div>
          <div style={buttonStyle}>
            <Button onClick={() => ws.current.send('pause-toggle')}>
              {isRunning ? 'Pause' : 'Go!'}
            </Button>
          </div>

        </div>
      </header>
  </> 
);
}

export default App;