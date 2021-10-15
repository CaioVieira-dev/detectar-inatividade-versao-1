/* eslint-disable react-hooks/exhaustive-deps */

import './App.css';
import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { useIdleTimer } from 'react-idle-timer'

 function App () {
  const timeout = 10000
  const [remaining, setRemaining] = useState(timeout)
  const [elapsed, setElapsed] = useState(0)
  const [lastActive, setLastActive] = useState(+new Date())
  const [lastEvent, setLastEvent] = useState('Events Emitted on Leader')
  const [leader, setLeader] = useState(true)
  
  const handleOnActive = () => setLastEvent('active')
  const handleOnIdle = () => {
    setLastEvent('idle')
alert('inativo')
}

  const {
    reset,
    pause,
    resume,
    getRemainingTime,
    getLastActiveTime,
    getElapsedTime,
    isIdle,
    isLeader
  } = useIdleTimer({
    timeout,
    onActive: handleOnActive,
    onIdle: handleOnIdle,
    crossTab: {
      emitOnAllTabs: false
    }
  })

  const handleReset = () => reset()
  const handlePause = () => pause()
  const handleResume = () => resume()

  useEffect(() => {
    setRemaining(getRemainingTime())
    setLastActive(getLastActiveTime())
    setElapsed(getElapsedTime())

    setInterval(() => {
      setRemaining(getRemainingTime())
      setLastActive(getLastActiveTime())
      setElapsed(getElapsedTime())
      setLeader(isLeader())
    }, 1000)
    function handleVisibilityChange(){
      if(document.visibilityState === 'visible'){
        handleReset()
        console.log('resetado \nRemaining Time:',getRemainingTime())
      }else{
        handlePause()
        console.log('pausado \nRemaining Time:',getRemainingTime())

      }
    }
    document.addEventListener('visibilitychange',handleVisibilityChange,false)
    return ()=>{
      document.removeEventListener('visibilitychange',handleVisibilityChange)
    }
  }, [])

  return (
    <div className="App">
      <header className="App-header"> 
         <div>
        <h1>Timeout: {timeout}ms</h1>
        <h1>Time Remaining: {remaining}</h1>
        <h1>Time Elapsed: {elapsed}</h1>
        <h1>Last Active: {format(lastActive, 'MM-dd-yyyy HH:MM:ss.SSS')}</h1>
        <h1>Last Event: {lastEvent}</h1>
        <h1>Is Leader: {leader.toString()}</h1>
        <h1>Idle: {isIdle().toString()}</h1>
      </div>
      <div>
        <button onClick={handleReset}>RESET</button>
        <button onClick={handlePause}>PAUSE</button>
        <button onClick={handleResume}>RESUME</button>
      </div>
      </header>
    </div>
  );
}

export default App;
