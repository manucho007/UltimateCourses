import React, { useState } from 'react';
import InteractiveView from './InteractiveView';
const Counter = () => {
  const [counter, setCounter] = useState(0);
  const [internalCount, setInternalCount] = useState(0);
  const onCountClickHandler = () => {
    setCounter((c) => c + 1);
    // localStorage.setItem('ultimateCounter', counter);
  };
  const onInternalCountClickHandler = () => {
    setInternalCount((i) => i + 1);
  };
  //   const onSaveClickHandler = () => {
  //     localStorage.setItem('ultimateCounter',counter)
  //   };

  //   useEffect(() => {
  //     document.title = `Counter set to ${counter} | Ultimate React Components`;
  //     console.log('Title Changed');
  //   }, [counter]);

  //   useEffect(() => {
  //     const savedCounterValue = localStorage.getItem('ultimateCounter');
  //     if (savedCounterValue != null) {
  //       setCounter(parseInt(savedCounterValue, 10));
  //     }
  //   }, []);

  console.log('Main Render Return');
  return (
    <>
      <h1>Counter</h1>
      <InteractiveView
        value={counter}
        onAction={onCountClickHandler}
        actionText='Increment'
      />
      <InteractiveView
        value={internalCount}
        onAction={onInternalCountClickHandler}
        actionText='Increment Internal Count'
      />
    </>
  );
};

export default Counter;
