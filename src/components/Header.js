import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <div className="Header">
      <div className="app-title">
        <span id="calendar-icon" className="icon">
          calendar_today
        </span>
        <span className="title">Valmore Calendar</span>
        <span className="instructions">
          Instructions: Pick a date, then click on 'Add Event' to add a new
          event | Click on events to view all events for the day, and there,
          click on an event to edit or delete it
        </span>
      </div>
      <div className="link-container">
        <a
          href="https://github.com/arndzk/valmore-calendar"
          target="blank"
          className="link"
        >
          <span id="source-code-icon" className="icon">
            code
          </span>
          <span className="link-text">View Repository</span>
        </a>
      </div>
    </div>
  );
};

export default Header;
