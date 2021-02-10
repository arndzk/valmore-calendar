import React, { useReducer } from 'react';
import '../styles/Form.css';

const Form = (props) => {
  const initialState = {
    eventName: '',
    eventDescription: '',
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

  const { eventName, eventDescription } = state;

  return (
    <div className="form-container">
      <form className="form">
        <div className="form-inputs">
          <input
            name="eventName"
            value={eventName}
            onChange={handleChange}
            placeholder="Event Name"
          />
          <input
            name="eventDescription"
            value={eventDescription}
            onChange={handleChange}
            placeholder="Event Description"
          />
        </div>
        <div className="form-btns">
          <div className="save-event btn">
            <span>Save Event</span>
          </div>
          <div className="cancel btn" onClick={props.triggerIdle}>
            <span>Cancel</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
