import React, { useState } from 'react';

// const OnMessage = () => <span>The Machine is On!</span>;
// const OffMessage = () => <span>The Machine is Off!</span>;

// Conditional rendering
// const OnOff = ({ isOn }) => {
//   if (isOn) {
//     return <OnMessage />;
//   } else {
//     return <OffMessage />;
//   }
// };

const ErrorMessage = ({ showError }) =>
  showError ? <span>Oh no you broke it</span> : null;

const UltimateMachine = () => {
  const [showError, setShowError] = useState(false);
  const onClickHandler = () => {
    setShowError((i) => !i);
  };

  return (
    <section>
      <h1>The Ultimate Machine</h1>
      <ErrorMessage showError={showError} />
      <button
        type='button'
        onClick={onClickHandler}
        aria-pressed={showError}
        className='btn-action'>
        Toggle Error
      </button>
    </section>
  );
};

export default UltimateMachine;
