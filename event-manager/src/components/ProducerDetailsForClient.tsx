import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProducerByEmail } from "../services/ProducerApi";
import { Producer } from "../types/Producer";
import { useAppNavigation } from "../contexts/AppNavigationContext";

export const ProducerDetailsForClient = () => {
  const location = useLocation();
  const email = location.state?.email; // כך תקבל את המייל מתוך ה-state
const appNavigate = useAppNavigation();
  const [producer, setProducer] = useState<Producer | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducer = async () => {
      try {
        if (email) {
          const result = await getProducerByEmail(email);
          setProducer(result);
        }
      } catch (err) {
        console.error("שגיאה בהבאת פרטי מפיקה:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducer();
  }, [email]);

  if (loading) return <div>טוען פרטים...</div>;
  if (!producer) return <div>לא נמצאה מפיקה</div>;

  return (
    <div>
      <h3>פרטי המפיקה:</h3>
      <p>שם: {producer.name}</p>
      <p>אימייל: {producer.email}</p>
      <p>טלפון: {producer.phone}</p>
      {producer.description && <p>אודות: {producer.description}</p>}
      <>
      <button onClick={() => appNavigate(-1)}>⬅ חזור אחורה</button>
      <button onClick={() => appNavigate("/")}>🏠 לדף הבית</button>
    </>
    </div>
  );
};
