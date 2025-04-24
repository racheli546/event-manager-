const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;
//לחיבור לDB
const mongoose = require('mongoose');

const Producer = require('./models/producer');
const Event = require('./models/Event');

//middleware
//אפשרות לשלוח json
app.use(express.json());
//אפשרות להריץ מהדפדפן
app.use(cors());


// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/event-manager", {

})
    .then(() => console.log("✅ מחובר ל-MongoDB"))
    .catch((err) => console.error("❌ שגיאה בהתחברות ל-MongoDB:", err));


//יצירת מפיקה 
app.post("/producers", async (req, res) => {
    console.log("post", req.body);
    try {
        const newProducer = new Producer(req.body);
        await newProducer.save();
        res.status(201).json(newProducer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all producers
app.get('/producers', async (req, res) => {
    try {
        const producers = await Producer.find();
        res.json(producers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a producer by email
app.get('/producers/:email', async (req, res) => {
    try {
        const producer = await Producer.findOne({ email: req.params.email });
        if (!producer) {
            return res.status(404).json({ message: 'Producer not found' });
        }
        res.json(producer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.put('/producers/:email', async (req, res) => {
    console.log("put", req.body);
    try {
        const { email } = req.params;
        const { name, phone, description } = req.body;

        const producer = await Producer.findOneAndUpdate(
            { email },
            { name, phone, description },
            { new: true }
        );
        console.log("put update", producer);
        if (!producer) {
            return res.status(404).json({ message: 'Producer not found' });
        }

        res.json(producer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});





//יצירת אירוע
app.post("/event", async (req, res) => {
    console.log("📩 POST /event activated!");
    console.log("📦 Body:", req.body);
    try {
      const newEvent = new Event(req.body);
      await newEvent.save(); // שלב 1: שמירת האירוע
      console.log("✅ Event saved");
      // שלב 2: חיפוש המפיקה לפי email
      const producer = await Producer.findOne({ email: req.body.producerEmail });
  
      if (!producer) {
        console.log("❌ Producer not found");
        return res.status(404).json({ message: "Producer not found" });
      }
  
      // שלב 3: הוספת ID של האירוע לרשימת האירועים של המפיקה
      producer.events.push(newEvent._id);
      await producer.save();
      console.log("✅ Producer updated")
      res.status(201).json(newEvent); // שלב 4: החזרת האירוע ללקוח
    } catch (error) {
      console.error("Error creating event:", error);
      res.status(400).json({ error: error.message });
    }
  });
  


app.get('/producers/:email/events', async (req, res) => {
    try {
        const producer = await Producer.findOne({ email: req.params.email }).populate('events');
        if (!producer) {
            return res.status(404).json({ message: 'Producer not found' });
        }
        res.json(producer.events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Get all events
app.get('/events', async (req, res) => {
    try {
        const events = await Event.find(); // אין populate כי אין ObjectId
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Get an event by ID
app.get('/event/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('producerId');
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// delete an event by ID
app.delete('/event/:id', async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Update an event by ID
app.put('/event/:id', async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//הפעלת השרת
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});