import React, { useState, useEffect } from 'react';
import Main from '../structure/Main';
import LoaderMessage from '../structure/LoaderMessage';
import IceCreamCard from '../ice-cream/IceCreamCard';
import IceCreamCardContainer from '../ice-cream/IceCreamCardContainer';
import { getIceCreams } from '../data/iceCreamData';
import PropTypes from 'prop-types';

const IceCreams = ({ history }) => {
  const [iceCreams, setIceCreams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getIceCreams().then(iceCreams => {
      if (isMounted) {
        setIceCreams(iceCreams);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Main headingText="Choose your posion and enjoy!">
      <LoaderMessage
        loadingMsg="Loading the stock list!"
        doneMsg="Loading stock list complete"
        isLoading={isLoading}
      />
      {iceCreams.length > 0 ? (
        <IceCreamCardContainer>
          {iceCreams.map(({ id, name }) => (
            <IceCreamCard
              key={id.toString()}
              iceCreamId={id}
              heading={name}
              to={'/'}
              history={history}
            />
          ))}
        </IceCreamCardContainer>
      ) : (
        !isLoading && (
          <p className="fully-stocked">Your Menu is Fully stocked</p>
        )
      )}
    </Main>
  );
};

IceCreams.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default IceCreams;
