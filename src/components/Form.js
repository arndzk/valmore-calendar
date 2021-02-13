import React, { useReducer, useContext } from 'react';
import '../styles/Form.css';
import AppContext from '../context/App/appContext';
import { format, parseISO } from 'date-fns';

const Form = (props) => {
  const appContext = useContext(AppContext);
  const { selectedDate, selectedEvent, setSelectedEvent } = appContext;

  let initialEventName;
  let initialEventDescription;
  let initialEventTime;

  if (props.formType === 'add-form') {
    initialEventName = '';
    initialEventDescription = '';
    initialEventTime = '00:00';
  } else if (props.formType === 'edit-form') {
    initialEventName = selectedEvent.event_name;
    initialEventDescription = selectedEvent.event_description;
    initialEventTime = props.eventTime;
  }

  const initialState = {
    eventName: initialEventName,
    eventDescription: initialEventDescription,
    eventTime: initialEventTime,
  };

  const reducer = (state, { property, value }) => {
    return {
      ...state,
      [property]: value,
    };
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (event) => {
    dispatch({ property: event.target.name, value: event.target.value });
  };

  const { eventName, eventDescription, eventTime } = state;

  let dateToDisplay;

  if (props.formType === 'add-form') {
    dateToDisplay = format(selectedDate, 'EEEEEEEEE dd/MM');
  }
  if (props.formType === 'edit-form') {
    dateToDisplay = format(
      parseISO(selectedEvent.event_date),
      'EEEEEEEEE dd/MM HH:mm'
    );
  }

  return (
    <form id={props.formType} className="form">
      <div className="form-header">
        <span>{props.formTitle}</span>
        <span className="header-date">{dateToDisplay}</span>
        {props.formType === 'edit-form' && (
          <div
            className="icon delete-btn"
            onClick={() => {
              props.deleteEvent();
              props.closeForm();
            }}
          >
            delete
          </div>
        )}
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
        <label className="input-label">Time:</label>
        <div className="time-picker">
          <input
            type="time"
            min="00:00"
            max="24:00"
            name="eventTime"
            value={eventTime}
            onChange={handleChange}
          ></input>
        </div>
      </div>
      <div className="form-btns">
        <div
          className="save-event btn"
          onClick={() => {
            props.preparePayload(
              eventName,
              eventDescription,
              eventTime,
              selectedDate
            );
            props.closeForm();
          }}
        >
          <span>{props.submitBtnText}</span>
        </div>
        <div
          className="cancel btn"
          onClick={() => {
            setSelectedEvent({});
            if (props.formType === 'edit-form') {
              props.displayEventView();
            }
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
