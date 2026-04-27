const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/eazypark')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Models
const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String
});

const Parking = mongoose.model('Parking', {
    location: String,
    slots: Number,
    available: Number
});

// Routes

// Signup
app.post('/signup', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json({ message: "User registered" });
});

// Login
app.post('/login', async (req, res) => {
    const user = await User.findOne(req.body);
    if (user) res.json({ message: "Login successful" });
    else res.json({ message: "Invalid credentials" });
});

// Get parking
app.get('/parking', async (req, res) => {
    const data = await Parking.find();
    res.json(data);
});

app.listen(5000, () => console.log("Server running on port 5000"));
