import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
// Hooks
import useUniqueIds from '../hooks/useUniqueIds';
import useValidation from '../hooks/useValidation';
// Components
import IceCreamImage from './IceCreamImage';
import ErrorContainer from './ErrorContainer';
import LoaderMessage from '../structure/LoaderMessage';
import Main from '../structure/Main';
// Functions
import { getMenuItem, putMenuItem, deleteMenuItem } from '../data/iceCreamData';
import {
  validateDescription,
  validatePrice,
  validateQuantity,
} from '../utils/validators';

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
  const [hasSubmitted, setHasSubmitted] = useState(false);
  // Generate unique ids with our custom hook
  const [
    descriptionId,
    stockId,
    quantityId,
    priceId,
    descriptionErrorId,
    quantityErrorId,
    priceErrorId,
  ] = useUniqueIds(7);

  // focus on the element with an error
  const formRef = useRef(null);

  // validate our fields with my custom useValidation hook
  const [descriptionError, descriptionErrorProps] = useValidation(
    menuItem.description,
    descriptionErrorId,
    hasSubmitted,
    validateDescription,
    true
  );
  const [priceError, priceErrorProps] = useValidation(
    menuItem.price,
    priceErrorId,
    hasSubmitted,
    validatePrice,
    true
  );
  const [quantityError, quantityErrorProps] = useValidation(
    menuItem.quantity,
    quantityErrorId,
    hasSubmitted,
    validateQuantity,
    false,
    menuItem.inStock
  );

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
          history.replace('/', { focus: true });
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

    setHasSubmitted(true);
    // For keyboard users if it finds an error it will focus automatically on it
    if (priceError || quantityError || descriptionError) {
      setTimeout(() => {
        const errorControl = formRef.current.querySelector(
          '[aria-invalid="true"]'
        );
        errorControl.focus();
      });
    } else {
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
        history.push('/', { focus: true });
      });
    }
  };

  const onDeleteHandler = () => {
    deleteMenuItem(match.params.menuItemId).then(() => {
      history.replace('/', { focus: true });
    });
  };

  return (
    <Main headingText="Update this beauty">
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
            <form onSubmit={onSubmitHandler} noValidate ref={formRef}>
              <label htmlFor={descriptionId}>
                Description<span aria-hidden="true">*</span>:
              </label>
              <ErrorContainer
                errorText={descriptionError}
                hasSubmitted={hasSubmitted}
                errorId={descriptionErrorId}
              >
                <textarea
                  name="description"
                  rows="3"
                  value={menuItem.description}
                  onChange={onChangeHandler}
                  id={descriptionId}
                  {...descriptionErrorProps}
                />
              </ErrorContainer>
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
              <ErrorContainer
                errorText={quantityError}
                hasSubmitted={hasSubmitted}
                errorId={quantityErrorId}
              >
                <select
                  name="quantity"
                  value={menuItem.quantity}
                  onChange={onChangeHandler}
                  id={quantityId}
                  {...quantityErrorProps}
                >
                  <option value="0">0</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                </select>
              </ErrorContainer>
              <label htmlFor={priceId}>
                Price <span aria-hidden="true">*</span> :
              </label>
              <ErrorContainer
                errorText={priceError}
                hasSubmitted={hasSubmitted}
                errorId={priceErrorId}
              >
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  value={menuItem.price}
                  onChange={onChangeHandler}
                  id={priceId}
                  {...priceErrorProps}
                />
              </ErrorContainer>
              <div className="button-container">
                <button type="submit" className="ok">
                  Save
                </button>
                <button
                  className="warning"
                  type="button"
                  onClick={onDeleteHandler}
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Main>
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
