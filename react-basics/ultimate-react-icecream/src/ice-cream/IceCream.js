import React, { useState, useRef, useEffect } from 'react';
import IceCreamImage from './IceCreamImage';
import ErrorContainer from './ErrorContainer';
// Hooks
import useUniqueIds from '../hooks/useUniqueIds';
import useValidation from '../hooks/useValidation';
// Functions
import {
  validateDescription,
  validatePrice,
  validateQuantity,
} from '../utils/validators';
import PropTypes from 'prop-types';

const IceCream = ({
  iceCream = {},
  price = 0,
  quantity = 0,
  inStock = true,
  description = '',
  onDelete,
  onSubmit,
}) => {
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

  //   Manage internal state from the component
  const [internalData, setInternalData] = useState({
    description: '',
    inStock: true,
    quantity: '0',
    price: '0.00',
  });

  // validate our fields with my custom useValidation hook
  const [descriptionError, descriptionErrorProps] = useValidation(
    internalData.description,
    descriptionErrorId,
    hasSubmitted,
    validateDescription,
    true
  );
  const [priceError, priceErrorProps] = useValidation(
    internalData.price,
    priceErrorId,
    hasSubmitted,
    validatePrice,
    true
  );
  const [quantityError, quantityErrorProps] = useValidation(
    internalData.quantity,
    quantityErrorId,
    hasSubmitted,
    validateQuantity,
    false,
    internalData.inStock
  );

  //   This use effect will tirgger if props are sent to the component
  // For example in the case of editing a component with data
  useEffect(() => {
    setInternalData({
      price: price.toFixed(2),
      inStock,
      quantity: quantity.toString(),
      description,
    });
  }, [price, inStock, description, quantity]);

  const onChangeHandler = e => {
    let newInternalData = {
      ...internalData,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    };
    if (e.target.name === 'quantity') {
      newInternalData.inStock = e.target.value !== '0';
    }
    if (e.target.name === 'inStock' && !e.target.checked) {
      newInternalData.quantity = '0';
    }
    setInternalData(newInternalData);
  };

  const onSubmitHandler = e => {
    e.preventDefault();

    // For keyboard users if it finds an error it will focus automatically on it
    setHasSubmitted(true);

    if (priceError || quantityError || descriptionError) {
      setTimeout(() => {
        const errorControl = formRef.current.querySelector(
          '[aria-invalid="true"]'
        );
        errorControl.focus();
      });
    } else {
      onSubmit({
        iceCream: { id: iceCream.id },
        price: parseFloat(internalData.price),
        inStock: internalData.inStock,
        quantity: parseInt(internalData.quantity),
        description: internalData.description,
      });
    }
  };

  return (
    <div className="form-frame">
      <div className="image-container">
        <IceCreamImage iceCreamId={iceCream.id} />
      </div>
      <div className="form-container">
        <dl>
          <dt>Name:</dt>
          <dd>{iceCream.name}</dd>
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
              value={internalData.description}
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
              checked={internalData.inStock}
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
              value={internalData.quantity}
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
              value={internalData.price}
              onChange={onChangeHandler}
              id={priceId}
              {...priceErrorProps}
            />
          </ErrorContainer>
          <div className="button-container">
            <button type="submit" className="ok">
              Save
            </button>
            {onDelete && (
              <button className="warning" type="button" onClick={onDelete}>
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

IceCream.propTypes = {
  iceCream: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  price: PropTypes.number,
  quantity: PropTypes.number,
  inStock: PropTypes.bool,
  description: PropTypes.string,
  onDelete: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
};

export default IceCream;
