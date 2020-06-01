const mongoose = require("mongoose");

// var golferSchema = require('./golfer').schema;

var Dogfight = mongoose.model("Dogfights", {
  date: Date,
  course: String,
  active_golfers: [
    {
      golferId: String,
      firstName: String,
      lastName: String,
      quota: Number,
      score: Number,
      teeTime: Date,
    },
  ],
  waitlist_golfers: {
    type: [String],
  },
  startTime: String,
  numberOfTimes: Number,
});

module.exports = Dogfight;
