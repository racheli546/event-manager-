
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteEvent, getEventsByProducerEmail } from "../services/EventApi";
import { Event as MyEvent} from "../types/Event"; // Ensure the file '../types/Event.ts' exists and exports 'Event'
import { useAppNavigation } from "../contexts/AppNavigationContext";
const ProducerEventsList = ({ email }: { email: string }) => {
  const navigate = useNavigate();
  const [eventsList, setEventList] = useState<MyEvent[]>([]);
  const appNavigate = useAppNavigation();
  
  useEffect(() => {
    if (email) {
      getEventByEmail();
    }
  }, [email]);

  const getEventByEmail = async () => {
    try {
      const response = await getEventsByProducerEmail(email);
      setEventList(response);
    } catch (error) {
      console.log("ProducerEventsList - Error fetching events:", error);
      setEventList([]);
    }
  };

  const deleteEventById = async (id: string) => {
    try {
      await deleteEvent(id);
      setEventList((prevEvents) => prevEvents.filter((event) => event.id !== id));
      alert("האירוע נמחק בהצלחה");
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleAddEventClick = () => {
    sessionStorage.setItem("producerEmail", email);
    navigate("/addEvent");
  };
  return (
    <div>
      <h3>רשימת האירועים של המפיקה</h3>
      {eventsList.length > 0 ? (
        eventsList.map((event) => (
          <div key={event.id}>
            <li>
              <Link to="/EventDetailsForProducer" state={{ event, email }}>
                {event.title}
              </Link>
            </li>
            <button onClick={() => deleteEventById(event.id)}>מחיקה</button>
          </div>
        ))
      ) : (
        <p>לא נמצאו אירועים</p>
      )}
      <button onClick={handleAddEventClick}>הוספת אירוע</button>
      <>
      <button onClick={() => appNavigate(-1)}>⬅ חזור אחורה</button>
      <button onClick={() => appNavigate("/")}>🏠 לדף הבית</button>
    </>
    </div>
  );
};

export default ProducerEventsList;
