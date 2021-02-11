import React from 'react';
import PropTypes from 'prop-types';
const ErrorContainer = ({ children, errorText, hasSubmitted, errorId }) => {
  return (
    <div className={errorText && hasSubmitted ? 'error' : null}>
      {children}
      <div className="error-wrapper">
        {hasSubmitted && errorText && <span id={errorId}>{errorText}</span>}
      </div>
    </div>
  );
};

ErrorContainer.propTypes = {
  errorText: PropTypes.string,
  children: PropTypes.node.isRequired,
  hasSubmitted: PropTypes.bool.isRequired,
  errorId: PropTypes.string.isRequired,
};
export default ErrorContainer;
