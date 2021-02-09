import '../styles/Calendar.css';
import React, { useState } from 'react';
import {
  format,
  parse,
  startOfMonth,
  endOfMonth,
  isSameMonth,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  isSameDay,
  addDays,
} from 'date-fns';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState('');

  const renderMonth = () => {
    const monthFormat = 'MMMM yyyy';

    return (
      <div className="header">
        <div className="left" onClick={previousMonth}>
          <div className="icon">chevron_left</div>
        </div>
        <div className="middle">
          <span className="month-year-display">
            {format(currentMonth, monthFormat)}
          </span>
        </div>
        <div className="right">
          <div className="icon" onClick={nextMonth}>
            chevron_right
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
        dates.push(
          <div
            className={`${
              !isSameMonth(date, monthStart)
                ? 'disabled'
                : isSameDay(date, selectedDate)
                ? 'selected'
                : 'date'
            }`}
            key={date}
            onClick={() => dateClickHandler(parse(date))}
          >
            <span className="dateNumber">{formattedDate}</span>
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

  const previousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const dateClickHandler = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="Calendar">
      {renderMonth()}
      {renderWeekDays()}
      {renderDates()}
    </div>
  );
};

export default Calendar;
