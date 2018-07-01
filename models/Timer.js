const mongoose = require("mongoose");
const { Schema } = mongoose;
const timerStepSchema = require("./TimerStep");
const timerCommentSchema = require("./TimerComment");

const timerSchema = new Schema({
  recipeId: String,
  timerStart: Date,
  timerEnd: Date,
  creationDate: Date,
  name: String,
  recipeTimerName: String,
  description: String,
  _user: { type: Schema.Types.ObjectId, ref: "users" },
  steps: [timerStepSchema],
  comments: [timerCommentSchema]
});

mongoose.model("timers", timerSchema);
