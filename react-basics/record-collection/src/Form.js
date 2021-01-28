import React, { useState } from 'react';
import Input from './Input';

const initialEntryState = {
  recordName: '',
  artistName: '',
  description: '',
};

const Form = ({ onSubmit }) => {
  const [entry, sentEntry] = useState(initialEntryState);
  const onChangeHanlder = (e) => {
    sentEntry({
      ...entry,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!entry.recordName || !entry.artistName) {
      return;
    }
    onSubmit({ ...entry });
    sentEntry(initialEntryState);
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <Input
        labelText='Record Name'
        name='recordName'
        onChange={onChangeHanlder}
        value={entry.recordName}
      />
      <Input
        labelText='Artist Name'
        name='artistName'
        onChange={onChangeHanlder}
        value={entry.artistName}
      />
      <Input
        type='textarea'
        labelText='Description'
        name='description'
        onChange={onChangeHanlder}
        value={entry.description}
      />
      <button type='submit'>Add</button>
    </form>
  );
};

export default Form;
