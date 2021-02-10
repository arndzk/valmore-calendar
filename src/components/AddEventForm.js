import '../styles/Form.css';
import React from 'react';
import Form from './Form';

const AddEventForm = (props) => {
  return (
    <div className="form-container">
      <Form triggerIdle={props.triggerIdle} />
    </div>
  );
};

export default AddEventForm;
