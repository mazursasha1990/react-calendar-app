import moment from 'moment';
import React from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import './index.scss';

const EventForm = ({
  setEventFormActive,
  events,
  setEvents,
  event,
  setEvent,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const id = uuidv4();
  const createdTime = moment().format('DD MM YYYY HH:mm ');
  const onSubmit = (data) => {
    setEvents([...events, { ...data, id: id, createdTime: createdTime }]);
    setEventFormActive(false);
  };
  const changeEventHandler = (text, field) => {
    setEvent((prevState) => ({
      ...prevState,
      [field]: text,
      updatedTime: createdTime,
    }));
  };

  const updateEvent = () => {
    setEvents(events && events.map((t) => (t.id === event.id ? event : t)));
    setEventFormActive(false);
    console.log('events', events);
  };

  const removeEvent = () => {
    setEvents(events && events.filter((t) => t.id !== event.id));
    setEvent(null);
    setEventFormActive(false);
  };

  const closeForm = () => {
    setEvent(null);
    setEventFormActive(false);
  };

  return (
    <div className='event-form-wraper'>
      {event ? (
        <form className='event-form' onSubmit={handleSubmit(updateEvent)}>
          <div className='event-form-header'>
            <div className='event-form-header-left-section'>
              <h3 className='event-form-header-title'>Edit idea item</h3>
              {event.updatedTime ? (
                <p className='event-form-header-create-time'>
                  Updated at: {event.updatedTime}
                </p>
              ) : event.createdTime ? (
                <p className='event-form-header-create-time'>
                  Created at: {event.createdTime}
                </p>
              ) : null}
            </div>
            <div className='event-form-header-right-section'>
              <button className='close-btn' onClick={closeForm}>
                X
              </button>
            </div>
          </div>

          <div className='inputs'>
            <label>
              <span>Title *</span>
              <input
                type='text'
                placeholder='Title goes here'
                name='title'
                value={event.title}
                {...register('title', {
                  onChange: (e) => changeEventHandler(e.target.value, 'title'),
                  required: 'Title is required',
                })}
              />
              <p className='error-message'>{errors.title?.message}</p>
            </label>
            <label>
              <span> Description</span>
              <textarea
                name='description'
                value={event.description}
                {...register('description', {
                  onChange: (e) =>
                    changeEventHandler(e.target.value, 'description'),
                  required: false,
                })}
              />
            </label>
          </div>

          <div className='date-time'>
            <label>
              <span>Date</span>
              <input
                type='text'
                placeholder='Date'
                name='date'
                value={event.date}
                {...register('date', {
                  onChange: (e) => changeEventHandler(e.target.value, 'date'),
                  required: 'Date is required',
                  pattern: {
                    value:
                      /^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)[0-9]{2}$/,
                    message: 'Date should be in format dd.mm.yyyy',
                  },
                })}
              />
              <p className='error-message'>{errors.date?.message}</p>
            </label>
            <label>
              <span> Begin time</span>
              <input
                type='time'
                placeholder='Time'
                name='time'
                value={event.time}
                {...register('time', {
                  onChange: (e) => changeEventHandler(e.target.value, 'time'),
                  required: false,
                })}
              />
            </label>
          </div>

          <div className='btn-block'>
            <input
              type='button'
              value='DELETE'
              className='delete-btn'
              onClick={removeEvent}
            />
            <input type='submit' value='SAVE' className='save-btn' />
          </div>
        </form>
      ) : (
        <form className='event-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='event-form-header'>
            <div className='event-form-header-left-section'>
              <h3 className='event-form-header-title'>Add new idea item</h3>
            </div>
            <div className='event-form-header-right-section'>
              <button
                className='close-btn'
                onClick={() => setEventFormActive(false)}
              >
                X
              </button>
            </div>
          </div>

          <div className='inputs'>
            <label>
              <span>Title *</span>
              <input
                type='text'
                placeholder='Title goes here'
                name='title'
                {...register('title', {
                  required: 'Title is required',
                })}
              />
              <p className='error-message'>{errors.title?.message}</p>
            </label>
            <label>
              <span> Description</span>
              <textarea
                name='description'
                {...register('description', { required: false })}
              />
            </label>
          </div>

          <div className='date-time'>
            <label>
              <span>Date</span>
              <input
                type='text'
                placeholder='Date'
                name='date'
                {...register('date', {
                  required: 'Date is required',
                  pattern: {
                    value:
                      /^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)[0-9]{2}$/,
                    message: 'Date should be in format dd.mm.yyyy',
                  },
                })}
              />
              <p className='error-message'>{errors.date?.message}</p>
            </label>
            <label>
              <span> Begin time</span>
              <input
                type='time'
                placeholder='Time'
                name='time'
                {...register('time', { required: false })}
              />
            </label>
          </div>

          <div className='btn-block'>
            <input type='submit' value='SAVE' />
          </div>
        </form>
      )}
    </div>
  );
};

export default EventForm;
