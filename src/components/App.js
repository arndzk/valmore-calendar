import '../styles/App.css';
import React, { useState, useContext } from 'react';
import AppState from '../context/App/AppState';
import AppContext from '../context/App/appContext';
import Header from './Header';
import Footer from './Footer';
import Calendar from './Calendar';
import AddEventForm from './AddEventForm';
import EditEventForm from './EditEventForm';

const App = () => {
  const [status, setStatus] = useState('idle');

  const editEventState = () => {
    setStatus('edit-event');
  };
  const addEventState = () => {
    setStatus('add-event');
  };
  const idleState = () => {
    setStatus('idle');
  };

  //{status === 'view-event' && <EditEventForm />}

  return (
    <div className="App">
      <AppState>
        <Header />
        <Calendar triggerAddEvent={addEventState} />
        {status === 'add-event' && <AddEventForm triggerIdle={idleState} />}
        {status === 'view-event' && (
          <EditEventForm
            triggerIdle={idleState}
            triggerEditEvent={editEventState}
          />
        )}
        <Footer />
      </AppState>
    </div>
  );
};

export default App;
