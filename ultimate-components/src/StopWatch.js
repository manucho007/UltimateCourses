import React, { useState, useEffect } from 'react';
import './stopwatch.css';
const StopWatch = () => {
  const [time, setTime] = useState(0);
  const [counterActive, setCounterActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (counterActive) {
      interval = setInterval(() => {
        setTime((c) => c + 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [counterActive]);

  const onClickHandler = () => {
    setCounterActive((c) => !c);
  };

  const formattedTime = new Date(time * 1000).toISOString().substr(11, 8);
  return (
    <section className='stopwatch-frame'>
      <h1>Ultimate Stopwatch</h1>
      <span>{formattedTime}</span>
      <button
        type='button'
        className='btn-action'
        aria-pressed={!counterActive}
        onClick={onClickHandler}>
        Stop/Start
      </button>
    </section>
  );
};

export default StopWatch;
