import React, { useReducer, useContext } from 'react';
import '../styles/Form.css';
import AppContext from '../context/App/appContext';
import { format } from 'date-fns';

const Form = (props) => {
  const appContext = useContext(AppContext);
  const { selectedDate } = appContext;

  const initialState = {
    formType: props.formType,
    formTitle: props.formTitle,
    eventName: props.eventName,
    eventDescription: props.eventDescription,
    submitBtnText: props.submitBtnText,
    closeForm: props.closeForm,
  };

  let dateToDisplay;

  if (initialState.formType === 'add-form') {
    dateToDisplay = format(selectedDate, 'EEEEEEEEE dd/MM');
  }

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

  const {
    formType,
    formTitle,
    eventName,
    eventDescription,
    submitBtnText,
    closeForm,
  } = state;

  return (
    <div className="form-container">
      <form id={formType} className="form">
        <div className="form-header">
          <span>{formTitle}</span>
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
          <div className="save-event btn">
            <span>{submitBtnText}</span>
          </div>
          <div className="cancel btn" onClick={closeForm}>
            <span>Cancel</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
