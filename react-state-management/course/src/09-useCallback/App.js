import React, { useCallback, useState } from 'react';
import { useComplete } from './useComplete';

export const App = () => {
  const [clicked, setClicked] = useState();
  let hello = 'hello';
  let completeCallback = useCallback((data) => console.log(data + hello), [
    hello,
  ]);
  useComplete(completeCallback);
  return (
    <div
      onClick={() => {
        setClicked(!clicked);
      }}>
      Hello
    </div>
  );
};
