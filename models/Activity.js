const mongoose = require('mongoose');

const ActivitySchema = mongoose.Schema({
  title: { type: String, required: true },
  trip_id: { type: String, required: true },
  users: { type: Array, required: true },
});

module.exports = mongoose.model('Activity', ActivitySchema);
