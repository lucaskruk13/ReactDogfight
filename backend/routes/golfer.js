const router = require("express").Router();
let Golfer = require("../models/golfer.model");
var ObjectID = require("mongodb").ObjectID;

// function getCurrentQuota(golfer) {
//   scores = golfer.scores.slice(-5);
//   sum = 0;
//   scores.forEach((score, i) => (sum += score.score));

//   return Math.round(sum / scores.length);
// }

router.route("/").get((req, res) => {
  Golfer.find()
    .then((golfer) => res.json(golfer))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  const newGolfer = new Golfer({ firstName, lastName });

  newGolfer
    .save()
    .then(() => res.json(newGolfer))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/allWithID").get((req, res) => {
  var returnList = [];

  Golfer.find()
    .then((golfers) => {
      golfers.forEach((golfer, i) => {
        returnList.push({
          id: golfer._id,
          name: golfer.getFullName(),
          last5: golfer.scores.slice(-5),
          currentQuota: golfer.currentQuota(),
        });
      });

      res.json(returnList);
    })
    .catch((err) => res.json("Testing"));
});

router.route("/:id").get((req, res) => {
  Golfer.findById(req.params.id)
    .then((golfer) => res.json(golfer))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id/currentQuota").get((req, res) => {
  Golfer.findById(req.params.id)
    .then((golfer) => {
      scores = golfer.scores.slice(-5);
      sum = 0;
      scores.forEach((score, i) => (sum += score.score));

      returnObject = {
        currentQuota: Math.round(sum / scores.length),
        last5Scores: golfer.scores.slice(-5),
      };

      res.json(returnObject);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
