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
      <span id="source-code-icon">
        <a
          href="https://github.com/arndzk/valmore-calendar"
          target="blank"
          className="icon"
        >
          code
        </a>
      </span>
    </div>
  );
};

export default Header;
