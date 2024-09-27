const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  abstract: { type: String, required: true },
  authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  paper: { type: String }, // URL or path to uploaded paper
  supplementaryFiles: [{ type: String }],
  status: {
    type: String,
    enum: ['Under Review', 'Accepted', 'Rejected'],
    default: 'Under Review',
  },
  conference: { type: mongoose.Schema.Types.ObjectId, ref: 'Conference' },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
}, { timestamps: true });

module.exports = mongoose.model('Submission', SubmissionSchema);
