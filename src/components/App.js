import '../styles/App.css';
import React, { useState, useContext } from 'react';
import AppState from '../context/App/AppState';
import Header from './Header';
import Footer from './Footer';
import Calendar from './Calendar';
import AddEventForm from './AddEventForm';
import EditEventForm from './EditEventForm';
import EventView from './EventView.js';

const App = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);

  const displayAddEvent = () => {
    setIsAdding(true);
  };
  const hideAddEvent = () => {
    setIsAdding(false);
  };
  const displayEditEvent = () => {
    setIsEditing(true);
  };
  const hideEditEvent = () => {
    setIsEditing(false);
  };
  const displayEventView = () => {
    setIsViewing(true);
  };
  const hideEventView = () => {
    setIsViewing(false);
  };

  return (
    <div className="App">
      <AppState>
        <Header />
        <Calendar
          displayAddEvent={displayAddEvent}
          displayEventView={displayEventView}
        />
        {isAdding && <AddEventForm hideAddEvent={hideAddEvent} />}
        {isEditing && (
          <EditEventForm
            hideEditEvent={hideEditEvent}
            displayEventView={displayEventView}
          />
        )}
        {isViewing && (
          <EventView
            hideEventView={hideEventView}
            displayEditEvent={displayEditEvent}
          />
        )}
        <Footer />
      </AppState>
    </div>
  );
};

export default App;
