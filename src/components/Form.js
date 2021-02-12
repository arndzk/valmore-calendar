import React, { useReducer, useContext } from 'react';
import '../styles/Form.css';
import AppContext from '../context/App/appContext';
import { format, parseISO } from 'date-fns';

const Form = (props) => {
  const appContext = useContext(AppContext);
  const { selectedDate, selectedEvent, setSelectedEvent } = appContext;

  const initialState = {
    eventName: selectedEvent.event_name,
    eventDescription: selectedEvent.event_description,
  };

  const reducer = (state, { property, value }) => {
    return {
      ...state,
      [property]: value,
    };
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (event) => {
    console.log('change detected', event.target.name, event.target.value);
    dispatch({ property: event.target.name, value: event.target.value });
  };

  const { eventName, eventDescription } = state;

  let dateToDisplay;

  if (props.formType === 'add-form') {
    dateToDisplay = format(selectedDate, 'EEEEEEEEE dd/MM');
  }
  if (props.formType === 'edit-form') {
    dateToDisplay = format(
      parseISO(selectedEvent.event_date),
      'EEEEEEEEE dd/MM hh:mm'
    );
  }

  return (
    <form id={props.formType} className="form">
      <div className="form-header">
        <span>{props.formTitle}</span>
        <span className="header-date">{dateToDisplay}</span>
      </div>
      <div className="form-inputs">
        <label className="input-label">Event Name:</label>
        <input
          name="eventName"
          value={eventName}
          onChange={handleChange}
          placeholder="Event Name"
        />
        <label className="input-label">Event Description:</label>
        <input
          name="eventDescription"
          value={eventDescription}
          onChange={handleChange}
          placeholder="Event Description"
        />
      </div>
      <div className="form-btns">
        <div
          className="save-event btn"
          onClick={() => {
            props.closeForm();
          }}
        >
          <span>{props.submitBtnText}</span>
        </div>
        <div
          className="cancel btn"
          onClick={() => {
            setSelectedEvent({});
            props.closeForm();
          }}
        >
          <span>Cancel</span>
        </div>
      </div>
    </form>
  );
};

export default Form;
