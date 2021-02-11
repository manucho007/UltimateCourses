import React from 'react';
import PropTypes from 'prop-types';
const ErrorContainer = ({ children, errorText, hasSubmitted }) => {
  return (
    <div className={errorText && hasSubmitted ? 'error' : null}>
      {children}
      <div className="error-wrapper">
        {hasSubmitted && errorText && <span>{errorText}</span>}
      </div>
    </div>
  );
};

ErrorContainer.propTypes = {
  errorText: PropTypes.string,
  children: PropTypes.node.isRequired,
  hasSubmitted: PropTypes.bool.isRequired,
};
export default ErrorContainer;
