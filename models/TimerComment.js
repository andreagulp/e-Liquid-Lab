const mongoose = require("mongoose");
const { Schema } = mongoose;

const timerCommentSchema = new Schema({
  creationDate: Date,
  text: String,
  daysSince: Number
});

module.exports = timerCommentSchema;
