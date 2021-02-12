import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
// Components
import IceCream from './IceCream';
import LoaderMessage from '../structure/LoaderMessage';
import Main from '../structure/Main';
// Functions
import { getIceCream, postMenuItem } from '../data/iceCreamData';

const AddIceCream = ({ history, location }) => {
  const isMounted = useRef(true);
  const [iceCream, setIceCream] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Check if the component is mounted
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    //   Get id from the location parameter
    // /menu-items/add?iceCreamId=6
    getIceCream(location.search.split('=')[1])
      .then(item => {
        if (isMounted.current) {
          setIceCream(item);
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (err.response.status === 404 && isMounted.current) {
          history.replace('/', { focus: true });
        }
      });
  }, [history, location.search]);

  const onSubmitHandler = menuItem => {
    postMenuItem(menuItem).then(() => {
      history.push('/', { focus: true });
    });
  };

  return (
    <Main headingText="Add some goodness to the menu">
      <LoaderMessage
        loadingMsg="Loading Ice Cream"
        doneMsg="Ice cream loaded."
        isLoading={isLoading}
      />
      {!isLoading && (
        <IceCream iceCream={iceCream} onSubmit={onSubmitHandler} />
      )}
    </Main>
  );
};

AddIceCream.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }),
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }),
};

export default AddIceCream;
