import axios from "axios";
import { Producer } from "../contexts/ProducerContext";

const API_URL = "http://localhost:5000"; 
export const getProducerByEmail = async (email: string): Promise<Producer> => {
	try {
		const response = await axios.get<Producer>(`${API_URL}/producers/${email}`); // 🔹 שינוי הנתיב בהתאם לשרת
		console.log("Calling API with email:", email);
		return response.data;
	} catch (error) {
		console.error("Error fetching events:", error);
		throw new Error("Producer not found");
	}
};


export const addProducer = async (producer: any) => {
	try {
		const response = await axios.post(`${API_URL}/producers`, producer, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error in addProducer:', error);
		throw error;
	}
};


export const updateProducer = async (producer: Producer) => {
	try {
		const response = await axios.put(
			`${API_URL}/producers/${producer.email}`,
			{
				name: producer.name,
				phone: producer.phone,
				description: producer.description,
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}	
		);
		return response.data;
	} catch (error) {
		console.error('Error in updateProducer:', error);
		throw error;
	}
};
