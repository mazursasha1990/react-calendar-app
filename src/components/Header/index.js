import React from 'react';
import moment from 'moment';
import {
  IoIosAddCircle,
  IoIosArrowBack,
  IoIosArrowForward,
} from 'react-icons/io';
import { IoCalendarClearOutline } from 'react-icons/io5';
import './index.scss';

export const Header = ({
  today,
  setToday,
  prevHendler,
  nextHendler,
  setEventFormActive,
  eventHandler,
}) => {
  // const start = 1970;
  // const end = 2070;
  // const yearsRange = [...Array(end - start + 1).keys()].map((x) => x + start);

  // const months = [
  //   'January',
  //   'February',
  //   'March',
  //   'April',
  //   'May',
  //   'June',
  //   'July',
  //   'August',
  //   'September',
  //   'October',
  //   'November',
  //   'December',
  // ];

  return (
    <div className='header'>
      <div className='left-section'>
        <IoIosAddCircle
          color='blue'
          size={'24px'}
          onClick={() => setEventFormActive(true)}
          cursor={'pointer'}
        />
      </div>
      <div>
        <p>
          {today.format('MMMM')} {today.format('YYYY')}
        </p>
      </div>
      <div className='right-section'>
        <div className='data-block'>
          <IoIosArrowBack cursor={'pointer'} onClick={() => prevHendler()} />
          <button onClick={() => setToday(moment())}>TODAY</button>
          <IoIosArrowForward cursor={'pointer'} onClick={() => nextHendler()} />
        </div>
        <IoCalendarClearOutline
          size={'24px'}
          onClick={() => console.log('Calendar')}
          cursor={'pointer'}
        />
      </div>
    </div>
  );
};

export default Header;
