import React, { useContext } from 'react';
import Form from './Form';
import AppContext from '../context/App/AppContext';
import { format } from 'date-fns';

const EditEventForm = (props) => {
  const context = useContext(AppContext);
  const { selectedEvent, getEvents } = context;

  const deleteEventCall = () => {
    const url = `https://api.corvium.com/api/1.0.0/test/events/${process.env.REACT_APP_VALMORE_API_KEY}/${selectedEvent._id}`;
    console.log(selectedEvent._id);
    fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMDE2IiwibmFtZSI6ImlBbGVydCBEZXZlbG9wZXIiLCJhZG1pbiI6dHJ1ZX0.2akYsCOtrsocM1UXPsoXbLjqwlc1X22lHCCcAqaNCo8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        getEvents();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const editEventCall = (payload) => {
    const url = `https://api.corvium.com/api/1.0.0/test/events/${process.env.REACT_APP_VALMORE_API_KEY}/${selectedEvent._id}`;
    fetch(url, {
      method: 'PUT',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMDE2IiwibmFtZSI6ImlBbGVydCBEZXZlbG9wZXIiLCJhZG1pbiI6dHJ1ZX0.2akYsCOtrsocM1UXPsoXbLjqwlc1X22lHCCcAqaNCo8',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_name: payload.payloadEventName,
        event_description: payload.payloadEventDescription,
        event_date: payload.payloadEventDate,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        getEvents();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const preparePayload = (
    eventName,
    eventDescription,
    eventTime,
    eventDate
  ) => {
    console.log(eventName, eventDescription, eventTime, eventDate);
    const formattedDate = format(eventDate, 'yyyy-MM-dd');
    const formattedDateTime = formattedDate + ' ' + eventTime + ':00';
    const ISOformat = new Date(formattedDateTime).toISOString();
    console.log(formattedDateTime);
    const payload = {
      payloadEventName: eventName,
      payloadEventDescription: eventDescription,
      payloadEventDate: ISOformat,
    };
    console.log(payload);
    editEventCall(payload);
  };

  return (
    <div className="form-container">
      <Form
        formType={'edit-form'}
        formTitle={'Edit Event '}
        submitBtnText={'Save Edits'}
        closeForm={props.hideEditEvent}
        displayEventView={props.displayEventView}
        deleteEvent={deleteEventCall}
        preparePayload={preparePayload}
      />
    </div>
  );
};

export default EditEventForm;
