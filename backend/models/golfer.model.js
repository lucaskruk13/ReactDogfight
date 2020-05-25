var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
  firstName: String,
  lastName: String,
  scores: [
    {
      score: {
        type: Number,
      },
      courseId: {
        type: Number,
      },
      course: {
        type: String,
      },
      date: {
        type: Date,
      },
    },
  ],
  last5: [
    {
      score: {
        type: Number,
      },
      courseId: {
        type: Number,
      },
    },
  ],
  fullName: String,
});

schema.methods.getFullName = function () {
  return this.firstName + " " + this.lastName;
};

schema.methods.currentQuota = function () {
  scores = this.scores.slice(-5);
  sum = 0;
  scores.forEach((score, i) => (sum += score.score));

  return Math.round(sum / scores.length);
};

module.exports = mongoose.model("golfer", schema);
