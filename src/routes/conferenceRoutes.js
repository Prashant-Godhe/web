const express = require('express');
const { getConferences, createConference, getConferenceById } = require('../controllers/conferenceController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all conferences
router.get('/', protect, getConferences);

// Create a new conference (Only Chair)
router.post('/', protect, authorize('Chair'), createConference);

// Get conference by ID
router.get('/:id', protect, getConferenceById);

module.exports = router;
