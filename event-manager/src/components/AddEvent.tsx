// src/pages/AddEvent.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addEvent } from "../services/EventApi"; // פקודת API להוספת אירועים
import { useAppNavigation } from "../contexts/AppNavigationContext";

export const AddEvent = () => {
  const navigate = useNavigate();
  const producerEmail = sessionStorage.getItem('producerEmail'); // קריאה ל־Session Storage לקבלת המפיקה

  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventPayment, setEventPayment] = useState('');
  const appNavigate = useAppNavigation();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!producerEmail) {
      alert('לא נמצאה מפיקה');
      return;
    }
  
    const newEvent = {
      title: eventName,
      date: eventDate,
      description: eventDescription,
      payment: eventPayment,
      producerEmail, // פשוט ככה
    };
  
    try {
      await addEvent(newEvent);
      alert('האירוע נוסף בהצלחה');
      navigate('/ProducerDetails');
    } catch (error: any) {
      console.error('Error adding event:', error);
      alert(`הייתה בעיה בהוספת האירוע: ${error.message}`);
    }
  };
  

  return (
    <div>
      <button onClick={() => navigate(-1)}>חזור אחורה</button>
      <button onClick={() => navigate("/")}>חזרה לדף הבית</button>
    </div>
  );
  return (
    <div>
      <h3>הוסף אירוע חדש</h3>
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
        <button type="submit">הוסף אירוע</button>
      </form>
      <>
      <button onClick={() => appNavigate(-1)}>⬅ חזור אחורה</button>
      <button onClick={() => appNavigate("/")}>🏠 לדף הבית</button>
    </>
    </div>
  );
};

// export default AddEvent;
