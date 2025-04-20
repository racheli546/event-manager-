import React, { use } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Welcome to the Event Manager</h1>
            <p>Your one-stop solution for managing events efficiently.</p>
            <button onClick={() => navigate('/ProducerDashboard')}>producers' entry</button>
            <button onClick={() => navigate('/EventListForUsers')}>users' entry</button>
        </div>
    );
}
export default HomePage;