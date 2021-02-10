import React from 'react';
import '../styles/Form.css';

const Form = (props) => {
  return (
    <div className="form-container">
      <div className="form">
        <div className="form-btns">
          <div className="save-event btn">
            <span>Save Event</span>
          </div>
          <div className="cancel btn" onClick={props.triggerIdle}>
            <span>Cancel</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
