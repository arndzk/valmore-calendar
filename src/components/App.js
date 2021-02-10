import '../styles/App.css';
import React, { useState } from 'react';
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
      <Header />
      <Calendar triggerAddEvent={addEventState} />
      {state === 'add-event' && <AddEventForm triggerIdle={idleState} />}
      <Footer />
    </div>
  );
};

export default App;
