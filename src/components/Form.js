import React, { useReducer, useContext } from 'react';
import '../styles/Form.css';
import AppContext from '../context/App/appContext';
import { format } from 'date-fns';

const Form = (props) => {
  const appContext = useContext(AppContext);
  const { selectedDate } = appContext;

  const {
    formType,
    formTitle,
    eventName,
    eventDescription,
    submitBtnText,
    closeForm,
  } = props;

  let dateToDisplay;

  if (formType === 'add-form') {
    dateToDisplay = format(selectedDate, 'EEEEEEEEE dd/MM');
  }

  // const reducer = (state, { property, value }) => {
  //   return {
  //     ...state,
  //     [property]: value,
  //   };
  // };

  // const [state, dispatch] = useReducer(reducer, initialState);

  // const handleChange = (event) => {
  //   dispatch({ property: event.target.name, value: event.target.value });
  // };

  // const { eventName, eventDescription } = state;

  return (
    <div className="form-container">
      <form id={formType} className="form">
        <div className="form-header">
          <span>{formTitle}</span>
          <span class="header-date">{dateToDisplay}</span>
        </div>
        <div className="form-inputs">
          <label className="input-label">Event Name:</label>
          <input
            name="eventName"
            value={eventName}
            //onChange={handleChange}
            placeholder="Event Name"
          />
          <label className="input-label">Event Description:</label>
          <input
            name="eventDescription"
            value={eventDescription}
            //onChange={handleChange}
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
