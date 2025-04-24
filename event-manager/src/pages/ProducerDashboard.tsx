import React from "react";
import { Producer, useProducer } from "../contexts/ProducerContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getProducerByEmail } from "../services/ProducerApi";

export default function ProducerDashboard() {
    const { setProducer } = useProducer();
    const navigate = useNavigate();
    const [showInput, setShowInput] = useState(false);
    const [showAddingProducer, setAddingProducer] = useState(true);
    const [email, setEmail] = useState(""); // משתנה לאחסון הערך שהוזן
    const handleSubmit = async () => {
        if (!email) {  // אם המייל ריק
            alert("אנא הזן כתובת מייל");  // הצגת הודעת שגיאה
            return;  // לא מעבירים לעמוד אם המייל ריק
        }
        // navigate("/ProducerDetails", { state: { email } });  // אם המייל לא ריק, לעבור לעמוד
        try {
            const result = await getProducerByEmail(email) as Producer | null;
            if (!result) {
              alert("המייל לא נמצא");
              return;
            }
            setProducer(result); // כאן שמירה ב־Context
            navigate("/ProducerDetails");
          } catch (err) {
            alert("שגיאה בטעינת פרטי מפיקה");
          }
    };

    return (
        <div>
            <h1>Producer Dashboard</h1>
            <button onClick={() => { setShowInput(true); setAddingProducer(false); }}>מפיקה קיימת</button>
            {showInput && (
                <div>
                    <input
                        type="email"
                        placeholder="הכנס כתובת מייל להזדהות"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button onClick={handleSubmit}>שלח</button>
                </div>
            )}
            {showAddingProducer && (
                <button onClick={() => navigate('/AddProducer')}>הוספת מפיקה</button>
            )}
        </div>
    );
}
