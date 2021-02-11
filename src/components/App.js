import '../styles/App.css';
import React, { useState } from 'react';
import AppState from '../context/App/AppState';
import Header from './Header';
import Footer from './Footer';
import Calendar from './Calendar';
import AddEventForm from './AddEventForm';

const App = () => {
  const [state, setState] = useState('idle');

  const addEventState = () => {
    setState('add-event');
  };
  const idleState = () => {
    setState('idle');
  };

  return (
    <div className="App">
      <AppState>
        <Header />
        <Calendar triggerAddEvent={addEventState} />
        {state === 'add-event' && <AddEventForm triggerIdle={idleState} />}
        <Footer />
      </AppState>
    </div>
  );
};

export default App;
