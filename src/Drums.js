import React, { useRef, useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';

function App() {
  const player1 = useRef();
  const player2 = useRef();
  const players = {
    81: player1,
    87: player2
  }

  const [ bassActive, setBassActive ] = useState(false)
  const [ clapActive, setClapActive ] = useState(false)

  function playSound(e) {
  
    const player = players[e.keyCode]
    if (!player) {
      return
    }
    if (e.keyCode === 81) {
      setBassActive(true)
      setTimeout(() => setBassActive(false), 100)
    }
    if (e.keyCode === 87) {
      setClapActive(true)
      setTimeout(() => setClapActive(false), 100)
    }
    player.current.currentTime = 0;
    player.current.play();
  }
  return (
    <div className="App" onKeyDown={playSound} tabIndex="0">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />
      <header className="App-header">
        <Button  active={bassActive} onClick={() => {
          player1.current.currentTime = 0;
          player1.current.play();
        }}>Bass</Button>
        <Button active={clapActive} onClick={() => {
          player2.current.currentTime = 0;
          player2.current.play();
        }}>Clap</Button>
        <audio src="http://dight310.byu.edu/media/audio/FreeLoops.com/3/3/Electro%20Kick%20Sound-14040-Free-Loops.com.mp3" ref={player1} />
        <audio src="http://dight310.byu.edu/media/audio/FreeLoops.com/2/2/Clap%20Hit%20Free%20005-1689-Free-Loops.com.mp3" ref={player2} />

      </header>
    </div>
  );
}

export default App;