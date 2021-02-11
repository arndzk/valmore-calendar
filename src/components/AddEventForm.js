import '../styles/Form.css';
import React, { useState, useContext } from 'react';
import Form from './Form';
import AppContext from '../context/App/appContext';

const AddEventForm = (props) => {
  const appContext = useContext(AppContext);
  const { addEvent, events } = appContext;

  return (
    <div className="form-container">
      <Form
        formType={'add-form'}
        formTitle={'Add Event for: '}
        eventName={''}
        eventDescription={''}
        submitBtnText={'Save Event'}
        closeForm={props.triggerIdle}
      />
    </div>
  );
};

export default AddEventForm;
