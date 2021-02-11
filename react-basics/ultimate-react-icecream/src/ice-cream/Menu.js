import React, { useState, useEffect } from 'react';
import { getMenu } from '../data/iceCreamData';
import IceCreamImage from './IceCreamImage';
import LoaderMessage from '../structure/LoaderMessage';
import Main from '../structure/Main';
import FocusLink from '../structure/FocusLink';
import PropTypes from 'prop-types';

const Menu = ({ history }) => {
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //   We make sure the state is not set in case the component gets unmounted
    let isMounted = true;
    const fetchMenu = async () => {
      if (isMounted) {
        const menuData = await getMenu();
        setMenu(menuData);
        setIsLoading(false);
      }
    };
    fetchMenu();

    // cleanup function to prevent memory leak
    return () => {
      isMounted = false;
    };
  }, []);

  const onItemClickHandler = to => {
    history.push(to, { focus: true });
  };

  // This is done to avoid the click handler of the section firing and placing 2 browse entries in the browser history
  const onClickLinkHandler = e => {
    // It will stop the event from bubbling up in the Dom tree
    e.stopPropagation();
  };

  return (
    <Main headingText="Rock your tastebuds with one of these!">
      <LoaderMessage
        loadingMsg="Loading menu."
        doneMsg="Loading menu complete."
        isLoading={isLoading}
      />
      {menu.length > 0 ? (
        <ul className="container">
          {menu.map(
            ({ id, iceCream, inStock, quantity, price, description }) => (
              <li key={id}>
                <section
                  className="card"
                  onClick={() => {
                    onItemClickHandler(`/menu-items/${id.toString()}`);
                  }}
                >
                  <div className="image-container">
                    <IceCreamImage iceCreamId={iceCream.id} />
                  </div>
                  <div className="text-container">
                    <h3>
                      <FocusLink
                        to={`/menu-items/${id.toString()}`}
                        onClick={onClickLinkHandler}
                      >
                        {iceCream.name}
                      </FocusLink>
                    </h3>
                    <div className="content card-content">
                      <p className="price">{`$${price.toFixed(2)}`}</p>
                      <p className={`stock ${inStock ? '' : 'out'}`}>
                        {inStock
                          ? `${quantity} in stock`
                          : 'Currently out of stock'}
                      </p>
                      <p className="description">{description}</p>
                    </div>
                  </div>
                </section>
              </li>
            )
          )}
        </ul>
      ) : (
        !isLoading && <p>Your menu is empty!</p>
      )}
    </Main>
  );
};

Menu.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};
export default Menu;
