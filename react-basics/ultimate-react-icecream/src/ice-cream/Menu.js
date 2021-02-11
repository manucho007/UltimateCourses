import React, { useState, useEffect } from 'react';
import { getMenu } from '../data/iceCreamData';
import Helmet from 'react-helmet';
import IceCreamImage from './IceCreamImage';
import LoaderMessage from '../structure/LoaderMessage';
import { Link } from 'react-router-dom';
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
    history.push(to);
  };

  // This is done to avoid the click handler of the section firing and placing 2 browse entries in the browser history
  const onClickLinkHandler = e => {
    // It will stop the event from bubbling up in the Dom tree
    e.stopPropagation();
  };

  return (
    <main>
      <Helmet>
        <title>
          Rock your tastebuds with one of these! | Ultimate Ice Cream
        </title>
      </Helmet>
      <h2 className="main-heading">Rock your tastebuds with one of these!</h2>
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
                      <Link
                        to={`/menu-items/${id.toString()}`}
                        onClick={onClickLinkHandler}
                      >
                        {iceCream.name}
                      </Link>
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
    </main>
  );
};

Menu.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};
export default Menu;
