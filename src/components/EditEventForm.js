import React, { useContext } from 'react';
import Form from './Form';
import AppContext from '../context/App/appContext';

const EditEventForm = (props) => {
  const context = useContext(AppContext);
  const { selectedEvent } = context;

  return (
    <div className="form-container">
      <Form
        formType={'edit-form'}
        formTitle={'Edit Event '}
        submitBtnText={'Save Edits'}
        closeForm={props.hideEditEvent}
        displayEventView={props.displayEventView}
      />
    </div>
  );
};

export default EditEventForm;
