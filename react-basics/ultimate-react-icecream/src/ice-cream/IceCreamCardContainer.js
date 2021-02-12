import React from 'react';
import PropTypes from 'prop-types';

const IceCreamCardContainer = ({ children }) => (
  <ul className="container">
    {React.Children.map(children, card => (
      <li>{card}</li>
    ))}
  </ul>
);

IceCreamCardContainer.propTypes = {
  chidlren: PropTypes.node,
};
export default IceCreamCardContainer;
