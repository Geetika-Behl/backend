const express = require('express');
const multer = require('multer');
const path = require('path');
const Report = require('../models/Report');

const router = express.Router();

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Report submission route
router.post('/submit', upload.single('image'), async (req, res) => {
    try {
        const { userId, description, latitude, longitude } = req.body;

        // Save report to the database
        const report = new Report({
            description,
            image: req.file.filename,
            location: {
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
            }
        });

        await report.save();
        res.status(201).json({ message: 'Report submitted successfully' });
    } catch (err) {
        console.error('Error saving report:', err);
        res.status(500).json({ error: err.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json(reports);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch reports' });
    }
});


module.exports = router;