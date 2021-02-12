import React, { useState, useEffect } from 'react';
import { getMenu } from '../data/iceCreamData';
import IceCreamCard from './IceCreamCard';
import IceCreamCardContainer from './IceCreamCardContainer';
import LoaderMessage from '../structure/LoaderMessage';
import Main from '../structure/Main';
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

  return (
    <Main headingText="Rock your tastebuds with one of these!">
      <LoaderMessage
        loadingMsg="Loading menu."
        doneMsg="Loading menu complete."
        isLoading={isLoading}
      />
      {menu.length > 0 ? (
        <IceCreamCardContainer>
          {menu.map(
            ({ id, iceCream, inStock, quantity, price, description }) => (
              <IceCreamCard
                key={id.toString()}
                iceCreamId={iceCream.id}
                to={`/menu-items/${id.toString()}`}
                heading={iceCream.name}
                history={history}
              >
                <div className="content card-content">
                  <p className="price">{`$${price.toFixed(2)}`}</p>
                  <p className={`stock ${inStock ? '' : 'out'}`}>
                    {inStock
                      ? `${quantity} in stock`
                      : 'Currently out of stock'}
                  </p>
                  <p className="description">{description}</p>
                </div>
              </IceCreamCard>
            )
          )}
        </IceCreamCardContainer>
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
