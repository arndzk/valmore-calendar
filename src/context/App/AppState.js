import React, { useReducer, useEffect } from 'react';

import AppReducer from './appReducer';
import AppContext from './appContext';

import { ADD_EVENT, SELECT_DATE, SELECT_EVENT, GET_EVENTS } from '../types';

const AppState = (props) => {
  const initialState = {
    events: [],
    selectedEvent: {},
    selectedDate: new Date(),
    currentDate: new Date(),
  };

  const url = `https://api.corvium.com/api/1.0.0/test/events/${process.env.REACT_APP_VALMORE_API_KEY}/list`;
  //const url = `https://api.corvium.com/api/1.0.0/test/events/${process.env.REACT_APP_VALMORE_API_KEY}/new`;

  useEffect(() => {
    // fetch(url, {
    //   method: 'POST', // or 'PUT'
    //   headers: {
    //     Authorization:
    //       'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMDE2IiwibmFtZSI6ImlBbGVydCBEZXZlbG9wZXIiLCJhZG1pbiI6dHJ1ZX0.2akYsCOtrsocM1UXPsoXbLjqwlc1X22lHCCcAqaNCo8',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     event_name: 'Test Event 6',
    //     event_description: 'This is a test event 6',
    //     event_date: '2021-02-11 21:00:00',
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('Success:', data);
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
    // fetch(
    //   `https://api.corvium.com/api/1.0.0/test/events/${process.env.REACT_APP_VALMORE_API_KEY}/60255498e4488100115479d7`,
    //   {
    //     method: 'DELETE', // or 'PUT'
    //     headers: {
    //       Authorization:
    //         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMDE2IiwibmFtZSI6ImlBbGVydCBEZXZlbG9wZXIiLCJhZG1pbiI6dHJ1ZX0.2akYsCOtrsocM1UXPsoXbLjqwlc1X22lHCCcAqaNCo8',
    //     },
    //   }
    // )
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

  const setSelectedEvent = (calendarEvent) => {
    console.log(calendarEvent);
    dispatch({
      type: SELECT_EVENT,
      payload: calendarEvent,
    });
  };

  return (
    <AppContext.Provider
      value={{
        events: state.events,
        selectedEvent: state.selectedEvent,
        selectedDate: state.selectedDate,
        addEvent,
        selectToday,
        setSelectedDate,
        setSelectedEvent,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
