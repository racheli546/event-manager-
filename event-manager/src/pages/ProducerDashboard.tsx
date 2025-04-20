import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";


export default function ProducerDashboard() {
    const navigate = useNavigate();
    const [showInput, setShowInput] = useState(false);
    const [showAddingProducer, setAddingProducer] = useState(true);
    const [email, setEmail] = useState(""); // משתנה לאחסון הערך שהוזן
    const handleSubmit = () => {
        if (!email) {  // אם המייל ריק
            alert("אנא הזן כתובת מייל");  // הצגת הודעת שגיאה
            return;  // לא מעבירים לעמוד אם המייל ריק
        }
        navigate("/ProducerDetails", { state: { email } });  // אם המייל לא ריק, לעבור לעמוד
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
                <button onClick={() => navigate('/AddingProducer')}>הוספת מפיקה</button>
            )}
        </div>
    );
}
