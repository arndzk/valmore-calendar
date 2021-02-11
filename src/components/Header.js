import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <div className="Header">
      <div className="app-title">
        <span id="calendar-icon" className="icon">
          calendar_today
        </span>
        <span>Valmore Calendar</span>
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
