const express = require('express');
const { submitPaper, getUserSubmissions, updateSubmissionStatus } = require('../controllers/submissionController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Submit a new paper (Only Author)
router.post('/', protect, authorize('Author'), submitPaper);

// Get all submissions for the logged-in user
router.get('/', protect, getUserSubmissions);

// Update submission status (Only Chair)
router.put('/:id/status', protect, authorize('Chair'), updateSubmissionStatus);

module.exports = router;
