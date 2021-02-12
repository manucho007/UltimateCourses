import React from 'react';
import iceCreamImg from '../assets/img/ultimate-ice-cream.svg';
import FocusLink from '../structure/FocusLink';

const Header = () => {
  return (
    <header>
      <h1>
        <img src={iceCreamImg} alt="" />
        Ultimate Ice Cream
      </h1>
      <nav>
        <FocusLink to="/" activeClassName="active" exact>
          Menu
        </FocusLink>
        <FocusLink to="/ice-creams" activeClassName="active">
          Add Ice Cream
        </FocusLink>
      </nav>
    </header>
  );
};

export default Header;
