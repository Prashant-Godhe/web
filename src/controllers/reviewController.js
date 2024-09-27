const Review = require('../models/Review');
const Submission = require('../models/Submission');

// Get papers assigned to the reviewer
const getAssignedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ reviewer: req.user._id }).populate('submission');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Submit a review
const submitReview = async (req, res) => {
  const { submissionId, comments, score, attachments } = req.body;

  try {
    // Check if the submission exists
    const submission = await Submission.findById(submissionId);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    // Create a new review
    const review = new Review({
      reviewer: req.user._id,
      submission: submissionId,
      comments,
      score,
      attachments,
    });

    const createdReview = await review.save();

    // Add review to submission
    submission.reviews.push(createdReview._id);
    await submission.save();

    res.status(201).json(createdReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAssignedReviews, submitReview };
