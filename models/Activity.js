const mongoose = require('mongoose');

const ActivitySchema = mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
});

module.exports = mongoose.model('Activity', ActivitySchema);
