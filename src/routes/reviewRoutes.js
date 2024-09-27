const express = require('express');
const { getAssignedReviews, submitReview } = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Get papers assigned to the reviewer (Only Reviewer, Meta-Reviewer)
router.get('/', protect, authorize('Reviewer', 'Meta-Reviewer'), getAssignedReviews);

// Submit a review (Only Reviewer, Meta-Reviewer)
router.post('/', protect, authorize('Reviewer', 'Meta-Reviewer'), submitReview);

module.exports = router;
