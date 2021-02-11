import React from 'react';
import Form from './Form';

const EditEventForm = (props) => {
  return (
    <div>
      <Form
        formType={'edit-form'}
        formTitle={'Edit Event '}
        eventName={''}
        eventDescription={''}
        submitBtnText={'Save Edits'}
        closeForm={props.triggerIdle}
      />
    </div>
  );
};

export default EditEventForm;
