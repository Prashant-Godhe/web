const Submission = require('../models/Submission');

// Submit a new paper
const submitPaper = async (req, res) => {
  const { title, abstract, authors, paper, supplementaryFiles, conference } = req.body;

  try {
    const submission = new Submission({
      title,
      abstract,
      authors,
      paper,
      supplementaryFiles,
      conference,
    });
    const createdSubmission = await submission.save();
    res.status(201).json(createdSubmission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all submissions for the logged-in user
const getUserSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ authors: req.user._id }).populate('conference').populate('reviews');
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update submission status (Only for Chair)
const updateSubmissionStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    submission.status = status;
    const updatedSubmission = await submission.save();
    res.json(updatedSubmission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { submitPaper, getUserSubmissions, updateSubmissionStatus };
