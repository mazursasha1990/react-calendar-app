import React, { useState, useEffect } from 'react';
import moment from 'moment';
import CalendarGrid from './components/CalendarGrid';
import Header from './components/Header';

import './App.scss';
import EventForm from './components/EventForm';

function App() {
  moment.updateLocale('en', { week: { dow: 1 } });
  const [today, setToday] = useState(moment());
  const startDay = today.clone().startOf('month').startOf('week');

  const [isEventFormActive, setEventFormActive] = useState(false);
  const [events, setEvents] = useState(
    localStorage.getItem('CALENDAR_STATE')
      ? JSON.parse(localStorage.getItem('CALENDAR_STATE'))
      : []
  );

  useEffect(() => {
    localStorage.setItem('CALENDAR_STATE', JSON.stringify(events));
  }, [events]);

  const [event, setEvent] = useState(null);

  const prevHendler = () => {
    setToday((prev) => prev.clone().subtract(1, 'month'));
  };
  const nextHendler = () => {
    setToday((prev) => prev.clone().add(1, 'month'));
  };
  const eventHandler = (method, eventForUpdate) => {
    console.log('eventHandler', method);
    setEvent(eventForUpdate);
    setEventFormActive(true);
  };

  return (
    <div className='App'>
      {isEventFormActive ? (
        <EventForm
          setEventFormActive={setEventFormActive}
          setEvents={setEvents}
          events={events}
          event={event}
          setEvent={setEvent}
        />
      ) : null}
      <Header
        today={today}
        setToday={setToday}
        prevHendler={prevHendler}
        nextHendler={nextHendler}
        setEventFormActive={setEventFormActive}
      />
      <CalendarGrid
        startDay={startDay}
        today={today}
        events={events}
        eventHandler={eventHandler}
      />
    </div>
  );
}

export default App;
