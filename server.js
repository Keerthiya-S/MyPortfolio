const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

// Connect to MongoDB
const url = 'mongodb://localhost:27017'; // Your MongoDB URL
const dbName = 'portfolio'; // Your database name
let db;

// Connect to MongoDB asynchronously
async function connectToDb() {
  try {
    const client = await MongoClient.connect(url);
    console.log('Connected to Database');
    db = client.db(dbName);
  } catch (error) {
    console.error('Error connecting to the database', error);
  }
}

connectToDb();

app.use(express.json()); // Middleware to parse JSON data
app.use(express.static('public')); // Serve static files like index.html

// POST route to handle form submission and save data to the database
app.post('/submitForm', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Data validation (optional)
    if (!name || !email || !subject || !message) {
      return res.status(400).send('All fields are required');
    }

    // Log the data being inserted
    // console.log('Data to insert:', { name, email, subject, message });

    // Insert data into the 'forms' collection in MongoDB
    const collection = db.collection('port');
    const result = await collection.insertOne({ name, email, subject, message });

    // console.log('Form data inserted:', result);
    res.send('Form data successfully saved');
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).send('Error saving data');
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
