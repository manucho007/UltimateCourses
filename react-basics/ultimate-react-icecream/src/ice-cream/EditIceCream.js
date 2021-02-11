import React, { useEffect, useState, useRef } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import '../styles/form-spacer.scss';
import useUniqueIds from '../hooks/useUniqueIds';
import IceCreamImage from './IceCreamImage';
import LoaderMessage from '../structure/LoaderMessage';
import { getMenuItem, putMenuItem } from '../data/iceCreamData';

const EditIceCream = ({ match, history }) => {
  const isMounted = useRef(true);
  const [menuItem, setMenuItem] = useState({
    price: '0.00',
    inStock: true,
    quantity: '0',
    description: '',
    iceCream: {},
  });
  const [isLoading, setIsLoading] = useState(false);
  // Generate unique ids with our custom hook
  const [descriptionId, stockId, quantityId, priceId] = useUniqueIds(4);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getMenuItem(match.params.menuItemId)
      .then(({ id, price, inStock, quantity, description, iceCream }) => {
        if (isMounted.current) {
          setMenuItem({
            id,
            price: price.toFixed(2),
            inStock,
            quantity: quantity.toString(),
            description,
            iceCream,
          });
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (err.response.status === 404 && isMounted.current) {
          history.replace('/');
        }
      });
  }, [match.params.menuItemId, history]);

  const onChangeHandler = e => {
    let newMenuData = {
      ...menuItem,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    };
    if (e.target.name === 'quantity') {
      newMenuData.inStock = e.target.value !== '0';
    }
    if (e.target.name === 'inStock' && !e.target.checked) {
      newMenuData.quantity = '0';
    }
    setMenuItem(newMenuData);
  };

  const onSubmitHandler = e => {
    e.preventDefault();

    const { id, price, inStock, quantity, description, iceCream } = menuItem;
    const submitItem = {
      id,
      iceCream: { id: iceCream.id },
      price: parseFloat(price),
      inStock,
      quantity: parseInt(quantity),
      description,
    };
    putMenuItem(submitItem).then(() => {
      history.push('/');
    });
  };

  return (
    <main>
      <Helmet>
        <title>Update this beauty | Ultimate Ice Cream</title>
      </Helmet>
      <h2 className="main-heading">Update this beauty</h2>

      <LoaderMessage
        loadingMsg="Loading Ice Cream"
        doneMsg="Ice cream loaded."
        isLoading={isLoading}
      />
      {!isLoading && (
        <div className="form-frame">
          <div className="image-container">
            <IceCreamImage iceCreamId={menuItem.iceCream.id} />
          </div>
          <div className="form-container">
            <dl>
              <dt>Name:</dt>
              <dd>{menuItem.iceCream.name}</dd>
            </dl>
            <form onSubmit={onSubmitHandler}>
              <label htmlFor={descriptionId}>Description:</label>
              <textarea
                name="description"
                rows="3"
                value={menuItem.description}
                onChange={onChangeHandler}
                id={descriptionId}
              />
              <label htmlFor={stockId}>In Stock:</label>
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={menuItem.inStock}
                  onChange={onChangeHandler}
                  id={stockId}
                />
                <div className="checkbox-wrapper-checked" />
              </div>
              <label htmlFor={quantityId}>Quantity: </label>
              <select
                name="quantity"
                value={menuItem.quantity}
                onChange={onChangeHandler}
                id={quantityId}
              >
                <option value="0">0</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>
              <label htmlFor={priceId}>Price:</label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={menuItem.price}
                onChange={onChangeHandler}
                id={priceId}
              />
              <div className="button-container">
                <button type="submit" className="ok">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

EditIceCream.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }),
};

export default EditIceCream;
