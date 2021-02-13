import '../styles/App.css';
import React, { useState } from 'react';
import AppState from '../context/App/AppState';
import Header from './Header';
import Footer from './Footer';
import Calendar from './Calendar';
import AddEventForm from './AddEventForm';
import EditEventForm from './EditEventForm';
import EventView from './EventView';
import LoadingSpinner from './LoadingSpinner';

const App = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
  const displayLoadingSpinner = () => {
    setIsLoading(true);
  };
  const hideLoadingSpinner = () => {
    setIsLoading(false);
  };

  return (
    <div className="App">
      <AppState>
        <Header />
        <Calendar
          displayAddEvent={displayAddEvent}
          displayEventView={displayEventView}
          hideLoadingSpinner={hideLoadingSpinner}
        />
        {isAdding && (
          <AddEventForm
            hideAddEvent={hideAddEvent}
            displayLoadingSpinner={displayLoadingSpinner}
            hideLoadingSpinner={hideLoadingSpinner}
          />
        )}
        {isEditing && (
          <EditEventForm
            hideEditEvent={hideEditEvent}
            displayEventView={displayEventView}
            displayLoadingSpinner={displayLoadingSpinner}
            hideLoadingSpinner={hideLoadingSpinner}
          />
        )}
        {isViewing && (
          <EventView
            hideEventView={hideEventView}
            displayEditEvent={displayEditEvent}
          />
        )}
        {isLoading && <LoadingSpinner />}
        <Footer />
      </AppState>
    </div>
  );
};

export default App;
