import React, { useState, useEffect } from 'react';
import './App.css';
const initialState = {
  firstName: '',
  lastName: '',
  biography: '',
  transport: '',
  agree: false,
  breakfast: false,
  lunch: false,
  dinner: false,
  shirtSize: '',
};

const loadedState = {
  firstName: 'Manuel',
  lastName: 'Rodriguez',
  biography: 'Awesome Dev',
  transport: 'Horses',
  agree: false,
  breakfast: true,
  lunch: true,
  dinner: true,
  shirtSize: 'm',
};

const FormContainer = () => {
  const [data, setData] = useState(initialState);
  const onSubmitHandler = (formState) => {
    console.log(formState);
  };

  const onClickHandler = () => {
    setData(loadedState);
  };

  return (
    <>
      <Form onSubmit={onSubmitHandler} data={data} />
      <button type='button' className='btn-action' onClick={onClickHandler}>
        Load data
      </button>
    </>
  );
};

const Form = ({ onSubmit, data }) => {
  const [formState, setFormState] = useState(initialState);

  const onChangeHandler = (e) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormState({
      ...formState,
      [e.target.name]: value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    onSubmit(formState);
  };

  useEffect(() => {
    setFormState(data);
  }, [data]);
  return (
    <>
      <h1>Form</h1>
      <form onSubmit={onSubmitHandler}>
        <span>{`Your name is ${formState.firstName} ${formState.lastName}`}</span>
        <label htmlFor='firstName'>First Name</label>
        <input
          id='firstName'
          name='firstName'
          onChange={onChangeHandler}
          value={formState.firstName}
        />
        <label htmlFor='lastName'>Last Name</label>
        <input
          id='lastName'
          name='lastName'
          onChange={onChangeHandler}
          value={formState.lastName}
        />
        <label htmlFor='biography'>Biography</label>
        <textarea
          id='biography'
          name='biography'
          onChange={onChangeHandler}
          rows='10'
          value={formState.biography}
        />
        <fieldset>
          <legend>Select your meals</legend>
          <input
            type='checkbox'
            id='breakfast'
            name='breakfast'
            onChange={onChangeHandler}
            checked={formState.breakfast}
          />
          <label htmlFor='breakfast'>Breakfast</label>
          <input
            type='checkbox'
            id='lunch'
            name='lunch'
            onChange={onChangeHandler}
            checked={formState.lunch}
          />
          <label htmlFor='lunch'>Lunch</label>
          <input
            type='checkbox'
            id='dinner'
            name='dinner'
            onChange={onChangeHandler}
            checked={formState.dinner}
          />
          <label htmlFor='dinner'>Dinner</label>
        </fieldset>
        <fieldset>
          <legend>T-Shirt Size</legend>
          <input
            type='radio'
            id='sizeS'
            name='shirtSize'
            onChange={onChangeHandler}
            checked={formState.shirtSize === 's'}
            value='s'
          />
          <label htmlFor='sizeS'>Small</label>
          <input
            type='radio'
            id='sizeM'
            name='shirtSize'
            onChange={onChangeHandler}
            checked={formState.shirtSize === 'm'}
            value='m'
          />
          <label htmlFor='sizeM'>Medium</label>
          <input
            type='radio'
            id='sizeL'
            name='shirtSize'
            onChange={onChangeHandler}
            checked={formState.shirtSize === 'l'}
            value='l'
          />
          <label htmlFor='sizeL'>Large</label>
        </fieldset>
        <label htmlFor='agree'>I agree to the TOC</label>
        <input
          type='checkbox'
          id='agree'
          name='agree'
          onChange={onChangeHandler}
          checked={formState.agree}
        />
        <label htmlFor='transport'>Prefered Transport</label>
        <select
          id='transport'
          name='transport'
          onChange={onChangeHandler}
          value={formState.transport}>
          <option>None Selected</option>
          <option value='planes'>planes</option>
          <option value='cars'>cars</option>
          <option value='boats'>boats</option>
          <option value='horses'>horses</option>
        </select>
        <button type='submit' className='btn-action'>
          Submit
        </button>
      </form>
    </>
  );
};

export default FormContainer;
