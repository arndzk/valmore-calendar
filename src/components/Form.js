import React, { useReducer, useContext } from 'react';
import '../styles/Form.css';
import AppContext from '../context/App/AppContext';
import { format, parseISO } from 'date-fns';

const Form = (props) => {
  const appContext = useContext(AppContext);
  const { selectedDate, selectedEvent, setSelectedEvent } = appContext;

  let initialEventName;
  let initialEventDescription;
  let initialEventTime;
  let initialEventDay;

  if (props.formType === 'add-form') {
    initialEventName = '';
    initialEventDescription = '';
    initialEventTime = '00:00';
    initialEventDay = '';
  } else if (props.formType === 'edit-form') {
    initialEventName = selectedEvent.event_name;
    initialEventDescription = selectedEvent.event_description;
    initialEventTime = format(parseISO(selectedEvent.event_date), 'HH:mm');
    initialEventDay = format(parseISO(selectedEvent.event_date), 'yyyy-MM-dd');
  }

  const initialState = {
    eventName: initialEventName,
    eventDescription: initialEventDescription,
    eventTime: initialEventTime,
    eventDay: initialEventDay,
    hasEmptyName: false,
    hasEmptyTime: false,
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

  const showErrName = () => {
    dispatch({ property: 'hasEmptyName', value: true });
  };

  const showErrTime = () => {
    dispatch({ property: 'hasEmptyTime', value: true });
  };

  const hideErrName = () => {
    dispatch({ property: 'hasEmptyName', value: false });
  };

  const hideErrTime = () => {
    dispatch({ property: 'hasEmptyTime', value: false });
  };

  const {
    eventName,
    eventDescription,
    eventTime,
    eventDay,
    hasEmptyName,
    hasEmptyTime,
  } = state;

  let dateToDisplay;

  if (props.formType === 'add-form') {
    dateToDisplay = format(selectedDate, 'EEEEEEEEE dd/MM');
  }
  if (props.formType === 'edit-form') {
    dateToDisplay = format(
      parseISO(selectedEvent.event_date),
      `EEEEEEEEE dd/MM hh:mm aaaaa'm'`
    );
  }

  return (
    <form id={props.formType} className="form">
      <div className="form-header">
        <div className="left-div"></div>
        <div className="header-text center-div">
          <span>{props.formTitle}</span>
          <span className="header-date">{dateToDisplay}</span>
        </div>
        <div className="right-div"></div>
      </div>
      <div className="form-inputs">
        {props.formType === 'edit-form' && (
          <div className="delete-controls">
            <div
              className="icon delete-btn"
              onClick={() => {
                props.deleteEvent();
                props.closeForm();
              }}
            >
              delete
            </div>
          </div>
        )}
        <div className="input-text">
          <label className="input-label">Event Name:</label>
          {hasEmptyName && (
            <span className="err-msg">Please, fill out this field!</span>
          )}
        </div>

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
        <div className="pickers">
          <div className="time-picker picker">
            <label className="input-label">Time:</label>
            <input
              type="time"
              min="00:00"
              max="24:00"
              name="eventTime"
              value={eventTime}
              onChange={handleChange}
            ></input>
          </div>
          {props.formType === 'edit-form' && (
            <div className="date-picker picker">
              <label className="input-label">Date:</label>
              <input
                type="date"
                name="eventDay"
                value={eventDay}
                onChange={handleChange}
              ></input>
            </div>
          )}
        </div>
        {hasEmptyTime && <span className="err-msg">Please, pick a time!</span>}
      </div>
      <div className="form-btns">
        <div
          className="save-event btn"
          onClick={() => {
            if (eventName !== '') {
              hideErrName();
            }
            if (eventTime !== '') {
              hideErrTime();
            }
            if (eventName === '') {
              showErrName();
            }
            if (eventTime === '') {
              showErrTime();
            }
            if (eventName !== '' && eventTime !== '') {
              props.preparePayload(
                eventName,
                eventDescription,
                eventTime,
                props.formType === 'add-form'
                  ? selectedDate
                  : new Date(eventDay)
              );
              props.closeForm();
            }
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
