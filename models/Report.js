const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    description: { type: String, required: true },
    image: { type: String, required: true },
    location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    }
}, { timestamps: true });  // This automatically adds createdAt & updatedAt

module.exports = mongoose.model('Report', reportSchema);
