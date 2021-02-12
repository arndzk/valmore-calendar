import '../styles/Calendar.css';
import React, { useState, useContext } from 'react';
import AppContext from '../context/App/appContext';
import {
  format,
  startOfMonth,
  endOfMonth,
  isSameMonth,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  isSameDay,
  addDays,
  parseISO,
} from 'date-fns';

const Calendar = (props) => {
  const appContext = useContext(AppContext);
  const {
    selectedDate,
    selectToday,
    setSelectedDate,
    events,
    selectedEvent,
    setSelectedEvent,
  } = appContext;

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  //const [selectedDate, setSelectedDate] = useState(new Date());

  const renderMonth = (props) => {
    const monthFormat = 'MMMM yyyy';

    return (
      <div className="header">
        <div className="left-div">
          <div className="select-today btn" onClick={resetToToday}>
            Today
          </div>
          <div className="icon arrow" onClick={previousMonth}>
            chevron_left
          </div>
          <div className="icon arrow" onClick={nextMonth}>
            chevron_right
          </div>
        </div>
        <div className="middle-div">
          <span className="month-display">
            {format(currentMonth, monthFormat)}
          </span>
        </div>
        <div className="right-div">
          <div className="add-event btn" onClick={props.displayAddEvent}>
            <div className="icon">add</div>
            <span>Add Event</span>
          </div>
        </div>
      </div>
    );
  };

  const renderWeekDays = () => {
    const dayFormat = 'EEEEEEEEE';
    const days = [];

    let weekStart = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="day" key={i}>
          {format(addDays(weekStart, i), dayFormat)}
        </div>
      );
    }
    return <div className="subheader">{days}</div>;
  };

  const renderDates = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = 'd';
    const dateRows = [];
    let dates = [];
    let date = startDate;
    let formattedDate = '';

    while (date <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(date, dateFormat);
        const cellDate = date;
        dates.push(
          <div
            className={`${
              !isSameMonth(date, monthStart)
                ? `date disabled`
                : isSameDay(date, selectedDate)
                ? 'date selected'
                : 'date'
            }`}
            key={date}
            onClick={() => dateClickHandler(cellDate, monthStart)}
          >
            <span className="date-number">{formattedDate}</span>
            {renderEvents(date)}
          </div>
        );
        date = addDays(date, 1);
      }
      dateRows.push(
        <div className="date-row" key={date}>
          {dates}
        </div>
      );
      dates = [];
    }
    return <div className="calendar-cells">{dateRows}</div>;
  };

  const renderEvents = (date) => {
    const eventArray = [];
    events.forEach((calendarEvent) => {
      if (isSameDay(parseISO(calendarEvent.event_date), date)) {
        eventArray.push(
          <div
            className="calendar-event"
            key={calendarEvent._id}
            onClick={() => {
              //setSelectedEvent(calendarEvent);
              props.displayEventView();
            }}
          >
            <span className="event-time">
              {formatTime(calendarEvent.event_date)}
            </span>
            <span>{calendarEvent.event_name}</span>
          </div>
        );
      }
    });
    return <div className="event-cells">{eventArray}</div>;
  };

  const formatTime = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleTimeString('en', {
      timeStyle: 'short',
      hour12: false,
    });
  };

  const resetToToday = () => {
    setCurrentMonth(currentDate);
    selectToday(currentDate);
  };

  const previousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const dateClickHandler = (date, monthStart) => {
    if (isSameMonth(date, monthStart)) {
      setSelectedDate(date);
    }
  };

  return (
    <div className="Calendar">
      {renderMonth(props)}
      {renderWeekDays()}
      {renderDates()}
    </div>
  );
};

export default Calendar;
