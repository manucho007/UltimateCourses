import React from 'react';

const InteractiveView = ({ value, onAction, actionText }) => {
  return (
    <>
      <p>{value}</p>
      <button type='button' onClick={onAction} className='btn-action'>
        {actionText}
      </button>
    </>
  );
};

export default InteractiveView;
