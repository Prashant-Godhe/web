const Session = require('../models/Session');
const Conference = require('../models/Conference');

// Create a new session
const createSession = async (req, res) => {
  const { title, description, speakers, startTime, endTime, venue, conference } = req.body;

  try {
    // Ensure the conference exists
    const conferenceExists = await Conference.findById(conference);
    if (!conferenceExists) {
      return res.status(404).json({ message: 'Conference not found' });
    }

    const session = new Session({
      title,
      description,
      speakers,
      startTime,
      endTime,
      venue,
      conference,
    });

    const createdSession = await session.save();

    // Optionally, add session to conference's schedule
    conferenceExists.schedule.push(createdSession._id);
    await conferenceExists.save();

    res.status(201).json(createdSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all sessions for a specific conference
const getSessionsByConference = async (req, res) => {
  const { conferenceId } = req.params;

  try {
    const sessions = await Session.find({ conference: conferenceId })
      .populate('speakers', 'name email')
      .populate('talks');

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single session by ID
const getSessionById = async (req, res) => {
  const { id } = req.params;

  try {
    const session = await Session.findById(id)
      .populate('speakers', 'name email')
      .populate('talks');

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a session
const updateSession = async (req, res) => {
  const { id } = req.params;
  const { title, description, speakers, startTime, endTime, venue } = req.body;

  try {
    const session = await Session.findById(id);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    session.title = title || session.title;
    session.description = description || session.description;
    session.speakers = speakers || session.speakers;
    session.startTime = startTime || session.startTime;
    session.endTime = endTime || session.endTime;
    session.venue = venue || session.venue;

    const updatedSession = await session.save();

    res.json(updatedSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a session
const deleteSession = async (req, res) => {
  const { id } = req.params;

  try {
    const session = await Session.findById(id);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    await session.remove();

    // Optionally, remove session from conference's schedule
    await Conference.findByIdAndUpdate(session.conference, {
      $pull: { schedule: session._id },
    });

    res.json({ message: 'Session removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSession,
  getSessionsByConference,
  getSessionById,
  updateSession,
  deleteSession,
};
