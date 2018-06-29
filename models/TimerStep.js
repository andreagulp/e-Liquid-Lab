const mongoose = require("mongoose");
const { Schema } = mongoose;

const timerStepSchema = new Schema({
  order: Number,
  name: String,
  days: Number,
  hours: Number,
  startDate: Date,
  endDate: Date,
  duration: Number,
  notificationActive: Boolean
});

module.exports = timerStepSchema;
