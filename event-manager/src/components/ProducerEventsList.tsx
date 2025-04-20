import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deleteEvent, getEventById } from "../services/EventApi";

const ProducerEventsList = ({ email }: { email: string }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [eventsList, setEventList] = useState<{ id: number; name: string; description: string; producerId: string }[]>([]);



    useEffect(() => {
        if (email) {
            getEventByEmail();
        }
    }, [email]);// נפעיל את הפונקציה כש-email משתנה

    const getEventByEmail = async () => {
        try {
            const response = await getEventById(email);
            setEventList(response as { id: number; name: string; description: string; producerId: string }[]);
        } catch (error) {
            console.log("Error fetching events:", error);
            setEventList([]);
        }
    }

    const deleteEventById = async (id: number) => {
        try {
            await deleteEvent(id);
            setEventList((prevEvents) => prevEvents.filter((event) => event.id !== id));
            alert("האירוע נמחק בהצלחה");
        } catch (error) {
            console.error("Error deleting event:", error);

        }
    }
    const handleAddEventClick = () => {
        // שמירה של המפיק ב-Session Storage
        sessionStorage.setItem('producerEmail', email);
        navigate('/addEvent');
    };
    return (
        <div>
        <h3 >רשימת הארועים למפיקה</h3>
        {
          eventsList.length > 0 ?
            (
              eventsList.map((event) => (
                <div key={event.id}>

                  <li>
                    <Link to="/EventDetailsForProducer" state={{ event, email }}>{event.name}</Link>
                  </li>
                  <button onClick={()=>deleteEventById(event.id)}>מחיקה</button>
                  </div>

              ))
            )
            : (
              <p>לא נמצאו אירועים</p>
            )

        }
      <button onClick={handleAddEventClick}>הוספה</button>
      </div>
    );
}
export default ProducerEventsList;