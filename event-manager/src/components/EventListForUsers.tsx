import { useEffect, useState } from "react";
import { getEvents } from "../services/EventApi";
import { getProducerByEmail } from "../services/ProducerApi";
import { Event } from "../types/Event";
import { Producer } from "../types/Producer";
import { Link } from "react-router-dom";
import { useAppNavigation } from "../contexts/AppNavigationContext";

export const EventListForUsers = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducer, setSelectedProducer] = useState<Producer | null>(null);
const appNavigate = useAppNavigation();
  useEffect(() => {
    const fetchEvents = async () => {
      const fetchedEvents = await getEvents();
      setEvents(fetchedEvents);
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowProducer = async (email: string) => {
    const producer = await getProducerByEmail(email);
    console.log("EventListForUsers - המפיקה שהתקבלה", producer);
    setSelectedProducer(producer as Producer);
  };
  console.log("EventListForUsers - event", events);

  return (
    <div>
      <h2>רשימת אירועים לציבור</h2>
      <input
        type="text"
        placeholder="חפש לפי שם האירוע..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => (
          <div key={event.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
            <h3>{event.title}</h3>
            <p>תאריך: {event.date}</p>
            <p>תיאור: {event.description}</p>
            <p>תשלום: ₪{event.payment}</p>
            <Link to="/ProducerDetailsForClient" state={{ email: event.producerEmail }}>
              <p>פרטי המפיקה</p>
            </Link>
            
             
          </div>
        ))
      ) : (
        <p>לא נמצאו אירועים</p>
      )}
 <>
      <button onClick={() => appNavigate(-1)}>⬅ חזור אחורה</button>
      <button onClick={() => appNavigate("/")}>🏠 לדף הבית</button>
    </>
    </div>
  );
};

export default EventListForUsers;
