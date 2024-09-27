const express = require('express');
const {
  createSession,
  getSessionsByConference,
  getSessionById,
  updateSession,
  deleteSession,
} = require('../controllers/sessionController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/sessions
// @desc    Create a new session
// @access  Protected (Chair)
router.post('/', protect, authorize('Chair'), createSession);

// @route   GET /api/sessions/conference/:conferenceId
// @desc    Get all sessions for a specific conference
// @access  Protected (All authenticated users)
router.get('/conference/:conferenceId', protect, getSessionsByConference);

// @route   GET /api/sessions/:id
// @desc    Get a single session by ID
// @access  Protected (All authenticated users)
router.get('/:id', protect, getSessionById);

// @route   PUT /api/sessions/:id
// @desc    Update a session
// @access  Protected (Chair)
router.put('/:id', protect, authorize('Chair'), updateSession);

// @route   DELETE /api/sessions/:id
// @desc    Delete a session
// @access  Protected (Chair)
router.delete('/:id', protect, authorize('Chair'), deleteSession);

module.exports = router;
