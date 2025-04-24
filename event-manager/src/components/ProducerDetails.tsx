import { Producer, useProducer } from "../contexts/ProducerContext";
import { useEffect, useState } from "react";
import { getProducerByEmail, updateProducer } from "../services/ProducerApi";
import ProducerEventsList from "./ProducerEventsList";
import { useAppNavigation } from "../contexts/AppNavigationContext";

export const ProducerDetails = () => {
  const { producer, setProducer } = useProducer();
  const [showUpdateDetails, setShowUpdateDetails] = useState(false);
const appNavigate = useAppNavigation();
  useEffect(() => {
    const fetchData = async () => {
      if (!producer?.email) return;
      const result = await getProducerByEmail(producer.email);
      if (result && typeof result === "object" && "name" in result && "email" in result) {
        setProducer(result as Producer);
      } else {
        console.error("Invalid producer data received");
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (producer)
      setProducer({ ...producer, [name]: value });
  };

  const handleSave = async () => {
    if (!producer) return;
    const updated = await updateProducer(producer) as Producer;
    setProducer(updated);
    setShowUpdateDetails(false);
    console.log("ProducerDetails - ProducerDetails", producer);
    alert("עודכן בהצלחה");
  };

  if (!producer) return <div>לא נמצאה מפיקה</div>;
  return (
    <div>
      <h1>פרטי מפיקה</h1>
      <h2>שם: {producer.name}</h2>
      <h2>אימייל: {producer.email}</h2>
      <h2>טלפון: {producer.phone}</h2>
      <h2>תיאור: {producer.description}</h2>

      <button onClick={() => setShowUpdateDetails(true)}>ערוך</button>

      {showUpdateDetails && (
        <>
          <input name="name" value={producer.name} onChange={handleInputChange} />
          <input name="email" value={producer.email} onChange={handleInputChange} />
          <input name="phone" value={producer.phone} onChange={handleInputChange} />
          <input name="description" value={producer.description} onChange={handleInputChange} />
          <button onClick={handleSave}>שמור</button>
        </>
      )}
      <ProducerEventsList email={producer.email} />
      <>
      <button onClick={() => appNavigate(-1)}>⬅ חזור אחורה</button>
      <button onClick={() => appNavigate("/")}>🏠 לדף הבית</button>
    </>
    </div>
  );
};
