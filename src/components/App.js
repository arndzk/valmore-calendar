import '../styles/App.css';
import React, { useState } from 'react';
import AppState from '../context/App/AppState';
import Header from './Header';
import Footer from './Footer';
import Calendar from './Calendar';
import AddEventForm from './AddEventForm';
import EditEventForm from './EditEventForm';

const App = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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

  //{status === 'view-event' && <EditEventForm />}

  return (
    <div className="App">
      <AppState>
        <Header />
        <Calendar
          displayAddEvent={displayAddEvent}
          displayEditEvent={displayEditEvent}
        />
        {isAdding && <AddEventForm hideAddEvent={hideAddEvent} />}
        {isEditing && <EditEventForm hideEditEvent={hideEditEvent} />}
        <Footer />
      </AppState>
    </div>
  );
};

export default App;
