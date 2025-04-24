import axios from "axios";
import { Event } from "../types/Event"; // Import the Event type
const API_URL = "http://localhost:5000"; // כתובת השרת שלך 

export const getEvents = async (): Promise<Event[]> => {
    try {
        const response = await axios.get(`${API_URL}/events`);
        const data = response.data as any[];

        // מיפוי להוספת שדה id במקום _id
        const events: Event[] = data.map(event => ({
            ...event,
            id: event._id,
        }));

        return events;
    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
};


export const getEventById = async (id: string): Promise<Event> => {
    try {
      const response = await axios.get<Event>(`${API_URL}/event/${id}`);
      const data = response.data as any;
      return {
        ...data,
        id: data._id,
      };
    } catch (error) {
      console.error("Error fetching event:", error);
      throw error;
    }
  };
  

export const addEvent = async (event: any) => {
    try {
        const response = await axios.post(`${API_URL}/event`, event, {
            headers: { 'Content-Type': 'application/json', },
        });
        return response.data;
    } catch (error) {
        console.error('Error in addEvent:', error);
        throw error;
    }
}

export const updateEvent = async (event: any) => {
    try {
        const response = await axios.put(`${API_URL}/event/${event.id}`, event, {
            headers: { 'Content-Type': 'application/json', },
        });
        return response.data;
    } catch (error) {
        console.error('Error in updateEvent:', error);
        throw error;
    }
}

export const deleteEvent = async (id: string) => {  
    try {
        const response = await axios.delete(`${API_URL}/event/${id}`);
        return response.data;   
    }
    catch (error) {
        console.error('Error in deleteEvent:', error);
        throw error;
    }   
}

export const getEventsByProducerEmail = async (email: string): Promise<Event[]> => {
    try {
      const response = await axios.get<Event[]>(`${API_URL}/producers/${email}/events`);
      const eventsWithId: Event[] = response.data.map((event: any) => ({
        ...event,
        id: event._id,
      }));
      return eventsWithId;
    } catch (error) {
      console.error("Error fetching events by email:", error);
      return [];
    }
  };
  
  
   
  
 