const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  submission: { type: mongoose.Schema.Types.ObjectId, ref: 'Submission', required: true },
  comments: { type: String },
  score: { type: Number },
  attachments: [{ type: String }],
  status: {
    type: String,
    enum: ['Submitted', 'Pending'],
    default: 'Pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('Review', ReviewSchema);
