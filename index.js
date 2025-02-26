const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
require('dotenv').config(); // Load environment variables

const chatRoutes = require("./routes/chatRoutes");
const userRoutes = require('./routes/userRoutes');
const reportRoutes = require('./routes/reportRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Middleware
app.use(cors({ origin: '*' })); // Allow all origins
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Corrected MongoDB Connection String
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://geetika:Geetika%402005@cluster0.xf42d.mongodb.net/myDatabase?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB successfully'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Multer Configuration for File Uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});
const upload = multer({ storage });

// Serve Static Files
app.use('/uploads', express.static('uploads'));

// Routes
app.get('/', (req, res) => {
    res.send('✅ Backend is running');
});

app.use("/api", chatRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/admin', adminRoutes);

// Configurable Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
