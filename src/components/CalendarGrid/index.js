import moment from 'moment';
import React from 'react';
// import EventForm from '../EventForm/index';
import './index.scss';

const CalendarGrid = ({ startDay, today, events, eventHandler }) => {
  const day = startDay.clone().subtract(1, 'day');
  const totalDays = 42;
  const daysArr = [...Array(totalDays)].map(() => day.add(1, 'day').clone());

  const ceilBackground = (day) => {
    if (moment().isSame(day, 'day')) {
      return 'calendar-ceil-current-day';
    }
    if (day.day() === 6 || day.day() === 0) {
      return 'calendar-ceil-weekend';
    }
    return 'calendar-ceil';
  };

  const ceilHeaderColor = (day) => {
    if (today.isSame(day, 'month')) {
      return 'calendar-ceil-header';
    }
    return 'calendar-ceil-header-not-current';
  };

  return (
    <div className='calendar-grid'>
      {daysArr.map((dayItem) => (
        <div key={dayItem.unix()} className={ceilBackground(dayItem)}>
          <div className={ceilHeaderColor(dayItem)}>
            <p className='calendar-ceil-day-number'>{dayItem.format('D')}</p>
            <p className='calendar-ceil-day-name'>{dayItem.format('dd')}</p>
          </div>

          <div className='events'>
            {events
              .filter((event) => event.date === dayItem.format('DD.MM.YYYY'))
              .map((event) => (
                <li
                  key={event.id}
                  className='event-title'
                  onClick={() => eventHandler('Update', event)}
                >
                  {event.title}
                </li>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalendarGrid;
