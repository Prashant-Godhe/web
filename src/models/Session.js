const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    speakers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    venue: {
      type: String,
      trim: true,
    },
    conference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conference',
      required: true,
    },
    talks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Talk',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Session', SessionSchema);
