const express = require('express');
const Report = require('../models/Report');

const router = express.Router();

// Approve or Reject a report
router.put('/update-status/:id', async (req, res) => {
    const { status } = req.body; // status can be "approved" or "rejected"
    try {
        const report = await Report.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!report) {
            return res.status(404).json({ error: 'Report not found' });
        }
        res.status(200).json({ message: 'Status updated successfully', report });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update status' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const report = await Report.findByIdAndDelete(req.params.id);
        if (!report) {
            return res.status(404).json({ error: 'Report not found' });
        }
        res.status(200).json({ message: 'Report deleted successfully', report });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete report' });
    }
});

// Update zone development level
router.put('/update-zone', async (req, res) => {
    const { latitude, longitude, development } = req.body; // development: 0 (green), 1 (yellow), 2 (red)
    try {
        // Logic to find and update zone in database
        // Example: Assume zones are stored in a collection `zones`
        const updatedZone = await Zone.findOneAndUpdate(
            { location: { latitude, longitude } },
            { development },
            { new: true, upsert: true } // upsert creates the zone if it doesn't exist
        );
        res.status(200).json({ message: 'Zone updated successfully', updatedZone });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update zone' });
    }
});

module.exports = router;
