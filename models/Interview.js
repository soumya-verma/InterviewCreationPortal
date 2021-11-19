const mongoose = require("mongoose");

const InterviewSchema = new mongoose.Schema({
  interviewer: {
    type: String,
    required: true,
  },
  candidate: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
});

module.exports = Interview = mongoose.model("interview", InterviewSchema);
