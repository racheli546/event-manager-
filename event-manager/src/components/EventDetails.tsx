// src/components/EventDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../services/EventApi";
import { getProducerByEmail } from "../services/ProducerApi";
import { Producer } from "../contexts/ProducerContext";
import { Event as MyEvent} from "../types/Event"; 
import { useAppNavigation } from "../contexts/AppNavigationContext";

export const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<MyEvent | null>(null);
  const [producer, setProducer] = useState<Producer | null>(null);
  const [loading, setLoading] = useState(true);
const appNavigate = useAppNavigation();
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const fetchedEvent = await getEventById(id!);
        setEvent(fetchedEvent);  

        if (fetchedEvent.producerEmail ) {
          const fetchedProducer = await getProducerByEmail(fetchedEvent.producerEmail);
          setProducer(fetchedProducer as Producer);
        }
      } catch (err) {
        console.error("Error loading event:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) return <p>טוען פרטי אירוע...</p>;
  if (!event) return <p>לא נמצא אירוע</p>;

  return (
    <div>
      <h1>{event.title}</h1>
      <p>תאריך: {event.date}</p>
      <p>תיאור: {event.description}</p>
      <p>תשלום: ₪{event.payment}</p>
      {producer && (
        <>
          <p>מפיק/ה: {producer.name}</p>
          <p>אימייל: {producer.email}</p>
        </>
      )}
       <>
      <button onClick={() => appNavigate(-1)}>⬅ חזור אחורה</button>
      <button onClick={() => appNavigate("/")}>🏠 לדף הבית</button>
    </>
    </div>
  );
};
