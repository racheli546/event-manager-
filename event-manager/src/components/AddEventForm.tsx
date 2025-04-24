// src/components/AddEventForm.tsx
import React, { useState } from 'react';
import { useProducer } from '../contexts/ProducerContext'; // context של המפיקה
import { addEvent } from '../services/EventApi';  // קריאה ל־API להוספת אירוע
import { useAppNavigation } from '../contexts/AppNavigationContext';

const AddEventForm = () => {
  const { producer } = useProducer();  // המפיקה מתוך ה־Context
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventPayment, setEventPayment] = useState('');
const appNavigate = useAppNavigation();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!producer) {
      alert('לא נמצאה מפיקה');
      return;
    }

    try {
      const newEvent = await addEvent({
        name: eventName,
        date: eventDate,
        description: eventDescription,
        payment: eventPayment,  // הוספת תשלום אם יש
        producerEmail: producer.email, // המפיקה שיש לה את המידע
      });
      alert('האירוע נוסף בהצלחה');
    } catch (error) {
      console.error('Error adding event:', error);
      alert('הייתה בעיה בהוספת האירוע');
    }
  };

  return (
    <div>
      <h2>הוסף אירוע</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>שם האירוע</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>תאריך האירוע</label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>תיאור האירוע</label>
          <textarea
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>תשלום</label>
          <input
            type="text"
            value={eventPayment}
            onChange={(e) => setEventPayment(e.target.value)}
            required
          />
        </div>
        <button type="submit">שמור</button>
      </form>
      <>
      <button onClick={() => appNavigate(-1)}>⬅ חזור אחורה</button>
      <button onClick={() => appNavigate("/")}>🏠 לדף הבית</button>
    </>
    </div>
  );
};

export default AddEventForm;
