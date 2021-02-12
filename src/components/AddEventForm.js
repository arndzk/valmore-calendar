import '../styles/Form.css';
import React, { useState } from 'react';
import Form from './Form';

const addEventCall = (eventName, eventDescription, eventDate) => {
  const url = `https://api.corvium.com/api/1.0.0/test/events/${process.env.REACT_APP_VALMORE_API_KEY}/new`;
  fetch(url, {
    method: 'POST',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMDE2IiwibmFtZSI6ImlBbGVydCBEZXZlbG9wZXIiLCJhZG1pbiI6dHJ1ZX0.2akYsCOtrsocM1UXPsoXbLjqwlc1X22lHCCcAqaNCo8',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event_name: eventName,
      event_description: eventDescription,
      event_date: eventDate + '18:00:00',
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

const AddEventForm = (props) => {
  return (
    <div className="form-container">
      <Form
        formType={'add-form'}
        formTitle={'Add Event for: '}
        eventName={''}
        eventDescription={''}
        submitBtnText={'Save Event'}
        closeForm={props.hideAddEvent}
      />
    </div>
  );
};

export default AddEventForm;
