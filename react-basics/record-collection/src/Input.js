import React, { useRef } from 'react';
import uniqid from 'uniqid';

const Input = ({ type, labelText, ...props }) => {
  // We make sure the id is only generated when is mounted for the first time
  // The ref will remain constant unless we change it ourselves
  const id = useRef(uniqid());
  return (
    <>
      <label htmlFor={id.current}>{labelText}</label>
      {type === 'textarea' ? (
        <textarea id={id.current} {...props} />
      ) : (
        <input id={id.current} {...props} />
      )}
    </>
  );
};

export default Input;
