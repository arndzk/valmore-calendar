import '../styles/Form.css';
import React, { useState } from 'react';
import Form from './Form';

const AddEventForm = (props) => {
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
