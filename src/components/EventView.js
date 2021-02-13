import React, { useContext } from 'react';
import AppContext from '../context/App/appContext';
import { isSameDay, parseISO, format } from 'date-fns';
import { formatTime } from '../utils/formatter';
import '../styles/EventView.css';

const EventView = (props) => {
  const eventContext = useContext(AppContext);
  const { selectedDate, events, setSelectedEvent } = eventContext;

  const renderEvents = (date) => {
    const eventArray = [];
    events.forEach((calendarEvent) => {
      if (isSameDay(parseISO(calendarEvent.event_date), date)) {
        eventArray.push(
          <div
            className="day-event"
            key={calendarEvent._id}
            onClick={() => {
              setSelectedEvent(calendarEvent);
              props.hideEventView();
              props.displayEditEvent();
            }}
          >
            <span className="event-time">
              {formatTime(calendarEvent.event_date)}
            </span>
            <span className="event-title">{calendarEvent.event_name}</span>
            <span className="event-description">
              {calendarEvent.event_description}
            </span>
          </div>
        );
      }
    });
    return <div className="day-event-cells">{eventArray}</div>;
  };

  //<span>{format(parseISO(selectedDate), 'EEEEEEEEE dd/MM')}</span>;

  return (
    <div className="form-container">
      <div className="form">
        <div className="form-header">
          <span>Events for: </span>
          <span>{format(selectedDate, 'EEEEEEEEE dd/MM')}</span>
        </div>
        <div className="event-view">{renderEvents(selectedDate)}</div>
        <div className="form-btns">
          <div
            className="cancel btn"
            onClick={() => {
              props.hideEventView();
            }}
          >
            Close
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventView;
