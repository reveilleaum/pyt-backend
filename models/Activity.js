const mongoose = require('mongoose');

const ActivitySchema = mongoose.Schema({
  trip_id: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  body: { type: Object, required: true },
});

module.exports = mongoose.model('Activity', ActivitySchema);
