import React from 'react';
import IceCreamImage from './IceCreamImage';
import FocusLink from '../structure/FocusLink';
import PropTypes from 'prop-types';

const IceCreamCard = ({ children, to, history, iceCreamId, heading }) => {
  const onItemClickHandler = () => {
    history.push(to, { focus: true });
  };

  // This is done to avoid the click handler of the section firing and placing 2 browse entries in the browser history
  const onClickLinkHandler = e => {
    // It will stop the event from bubbling up in the Dom tree
    e.stopPropagation();
  };
  return (
    <section className="card" onClick={onItemClickHandler}>
      <div className="image-container">
        <IceCreamImage iceCreamId={iceCreamId} />
      </div>
      <div className="text-container">
        <h3>
          <FocusLink to={to} onClick={onClickLinkHandler}>
            {heading}
          </FocusLink>
        </h3>
        {children}
      </div>
    </section>
  );
};

IceCreamCard.propTypes = {
  iceCreamId: PropTypes.number.isRequired,
  heading: PropTypes.string.isRequired,
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      focus: PropTypes.bool,
    }),
  ]).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  children: PropTypes.node,
};

export default IceCreamCard;
