const Conference = require('../models/Conference');

// Get all conferences
const getConferences = async (req, res) => {
  try {
    const conferences = await Conference.find();
    res.json(conferences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new conference
const createConference = async (req, res) => {
  const { name, description, dates } = req.body;

  try {
    const conference = new Conference({ name, description, dates });
    const createdConference = await conference.save();
    res.status(201).json(createdConference);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific conference by ID
const getConferenceById = async (req, res) => {
  try {
    const conference = await Conference.findById(req.params.id);
    if (conference) {
      res.json(conference);
    } else {
      res.status(404).json({ message: 'Conference not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getConferences, createConference, getConferenceById };
