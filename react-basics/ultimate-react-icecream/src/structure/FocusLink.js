import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const FocusLink = ({ to, children, activeClassName, ...props }) => {
  const newTo =
    typeof to === 'string'
      ? { pathname: to, state: { focus: true } }
      : {
          ...to,
          state: to.state ? { ...to.state, focus: true } : { focus: true },
        };

  return activeClassName ? (
    <NavLink {...props} to={newTo} activeClassName={activeClassName}>
      {children}
    </NavLink>
  ) : (
    <Link {...props} to={newTo}>
      {children}
    </Link>
  );
};

export default FocusLink;
