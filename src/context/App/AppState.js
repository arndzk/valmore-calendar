import React, { useReducer, useEffect } from 'react';

import AppReducer from './appReducer';
import AppContext from './appContext';

import { ADD_EVENT, VIEW_EVENT, SELECT_DATE, GET_EVENTS } from '../types';

const AppState = (props) => {
  const initialState = {
    events: [],
    selectedEvent: {},
    selectedDate: new Date(),
    currentDate: new Date(),
    status: 'idle',
  };

  const url = `https://api.corvium.com/api/1.0.0/test/events/${process.env.REACT_APP_VALMORE_API_KEY}/list`;

  useEffect(() => {
    // fetch(url, {
    //   method: 'POST', // or 'PUT'
    //   headers: {
    //     Authorization:
    //       'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMDE2IiwibmFtZSI6ImlBbGVydCBEZXZlbG9wZXIiLCJhZG1pbiI6dHJ1ZX0.2akYsCOtrsocM1UXPsoXbLjqwlc1X22lHCCcAqaNCo8',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     event_name: 'Test Event 3',
    //     event_description: 'This is a test event 3',
    //     event_date: '2021-03-5 18:00:00',
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('Success:', data);
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
    // fetch(url, {
    //   method: 'DELETE', // or 'PUT'
    //   headers: {
    //     Authorization:
    //       'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMDE2IiwibmFtZSI6ImlBbGVydCBEZXZlbG9wZXIiLCJhZG1pbiI6dHJ1ZX0.2akYsCOtrsocM1UXPsoXbLjqwlc1X22lHCCcAqaNCo8',
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('Success:', data);
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
    fetch(url, {
      method: 'POST', // or 'PUT'
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMDE2IiwibmFtZSI6ImlBbGVydCBEZXZlbG9wZXIiLCJhZG1pbiI6dHJ1ZX0.2akYsCOtrsocM1UXPsoXbLjqwlc1X22lHCCcAqaNCo8',
      },
      body: JSON.stringify({ limit: 100, sort: 'created_at' }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        setEvents(processData(data));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const processData = (data) => {
    let eventList = [];
    eventList = data.return.docs;
    const processedEventList = [];
    eventList.forEach((calendarEvent) => {
      processedEventList.push({
        _id: calendarEvent._id,
        event_name: calendarEvent.event_name,
        event_description: calendarEvent.event_description,
        event_date: calendarEvent.event_date,
      });
    });
    return processedEventList;
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

  const setEvents = (result) => {
    dispatch({
      type: GET_EVENTS,
      payload: result,
    });
  };

  const addEvent = (event) => {
    let userEvents = [...state.events];
    userEvents.push(event);
    dispatch({
      type: ADD_EVENT,
      payload: userEvents,
    });
  };

  const selectToday = () => {
    dispatch({
      type: SELECT_DATE,
      payload: state.currentDate,
    });
  };

  const setSelectedDate = (date) => {
    dispatch({
      type: SELECT_DATE,
      payload: date,
    });
  };

  const setStatus = (newStatus) => {
    dispatch({
      type: VIEW_EVENT,
      payload: newStatus,
    });
  };

  return (
    <AppContext.Provider
      value={{
        events: state.events,
        selectedEvent: state.selectedEvent,
        selectedDate: state.selectedDate,
        status: state.status,
        addEvent,
        selectToday,
        setSelectedDate,
        setStatus,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
