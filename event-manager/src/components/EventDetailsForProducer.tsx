import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Producer } from "../types/Producer"; // Ensure the file '../types/Producer.ts' exists and exports 'Producer'
import { getProducerByEmail } from "../services/ProducerApi";
import React from "react";
import { updateEvent } from "../services/EventApi";
import { useAppNavigation } from "../contexts/AppNavigationContext";

export const EventDetailsForProducer = () => {
    const location = useLocation();
    const [showInput, setShowInput] = useState(false);
    const { event, email } = location.state || {};
    const [_event, _setEvent] = useState(event || { name: "", description: "", producerId: "" }); // אם לא הועבר אירוע, נשתמש ב-null
    const [producer, setProducer] = useState<Producer | null>(null); // סטייט לשמירת פרטי המפיק
    const [loading, setLoading] = useState(true); // סטייט לטעינה
const appNavigate = useAppNavigation();
    useEffect(() => {
        if (_event.producerId) {
            const fetchProducer = async () => {
                try {
                    const producerData = await getProducerByEmail(_event.producerId);
                    setProducer(producerData as Producer); // עדכון הסטייט עם פרטי המפיק
                } catch (error) {
                    console.error("Error fetching producer:", error);
                }
                finally {
                    setLoading(false); // סיום טעינה
                }
            };
            fetchProducer();
        }
    }, [_event.producerId]); // הפעל את הפונקציה כאשר ה-producerId משתנה

    if (!event) {
        return <p>לא נמצאו פרטי אירוע</p>; // אם לא הועבר אירוע, הצג הודעה מתאימה
    }

    const editEvent = async () => {
        try {
            const result = await updateEvent(_event); // שימוש ב-_event במקום event
            alert("האירוע עודכן בהצלחה");
            console.log('EventDetailsForProducer - ', result);
        } catch (error) {
            console.error("Error in updateEvent:", error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        _setEvent((prevState: any) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div>
            <div>
                <h1>{_event.title}</h1>
                <p>{_event.description}</p>
                <p>תאריך: {_event.date}</p>
                <p>תשלום: {_event.payment}</p>
                <p>מפיק/ה: {email}</p>
                
                
                <button onClick={() => setShowInput(true)}>לעריכת הארוע</button>
            </div>
            {showInput && (
                <>
                    <input
                        type="text"
                        name="title"
                        value={_event.title}
                        onChange={handleInputChange}
                        placeholder="name"
                    />
                    <input
                        type="text"
                        name="description"
                        value={_event.description}
                        onChange={handleInputChange}
                        placeholder="description"
                    />
                    <input
                        type="text"
                        name="date"
                        value={_event.date}
                        onChange={handleInputChange}
                        placeholder="date"
                    />
                    <input
                        type="text"
                        name="payment"
                        value={_event.payment}
                        onChange={handleInputChange}
                        placeholder="payment"
                    />

                    <button onClick={()=>{setShowInput(false); editEvent()}}>save</button>
                </>
            )}
             <>
      <button onClick={() => appNavigate(-1)}>⬅ חזור אחורה</button>
      <button onClick={() => appNavigate("/")}>🏠 לדף הבית</button>
    </>
        </div>
    );
};
export default EventDetailsForProducer;