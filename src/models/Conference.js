const mongoose = require('mongoose');

const ConferenceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  dates: { type: String },
  schedule: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }],
}, { timestamps: true });

module.exports = mongoose.model('Conference', ConferenceSchema);
