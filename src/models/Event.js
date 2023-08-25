const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventId: String,
  summary: String,
  startDateTime: Date,
  // Other event properties you want to store
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
