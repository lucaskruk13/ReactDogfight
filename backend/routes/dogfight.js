const router = require("express").Router();
let Dogfight = require("../models/dogfight.model");
let Golfer = require("../models/golfer.model");

router.route("/").get((req, res) => {
  Dogfight.find()
    .then((dogfight) => [res.json(dogfight.sort(compare))])
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/upcoming").get((req, res) => {
  Dogfight.find()
    .then((dogfights) => {
      var temp = dogfights.map((d) =>
        Math.abs(new Date() - new Date(d.date).getTime())
      );
      var idx = temp.indexOf(Math.min(...temp));
      console.log(dogfights[idx]);
      res.json([dogfights[idx]]);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").post((req, res) => {
  const date = req.body.date;

  if (!date) {
    res.status(422).json("Error: Date must be provided");
    return;
  }

  Dogfight.findOne({ date: date })
    .then((dogfight) => {
      if (dogfight) {
        res.json(dogfight);
      } else {
        const newDogfight = new Dogfight({
          date: req.body.date,
          course: req.body.course,
        });

        newDogfight
          .save()
          .then((df) => res.json(df))
          .catch((err) => res.status(500).json("Error: " + err));
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Dogfight.findById(req.params.id)
    .then((dogfight) => res.json(dogfight))
    .catch((err) => req.status(500).json(err));
});

router.route("/:dogfightId/addGolfer/:golferId").post((req, res) => {
  Dogfight.findById(req.params.dogfightId)
    .then((dogfight) => {
      Golfer.findById(req.params.golferId)
        .then((golfer) => {
          dogfight.active_golfers.push({
            golferId: golfer.id,
            firstName: golfer.firstName,
            lastName: golfer.lastName,
            score: 0,
            quota: golfer.currentQuota(),
          });
          dogfight
            .save()
            .then((df) => res.json(df))
            .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id/allGolfers/").get((req, res) => {
  Dogfight.findById(req.params.id)
    .then((dogfight) => {
      const golfers = dogfight.active_golfers;

      res.json({
        date: dogfight.date,
        couse: dogfight.course,
        numberOfGolfers: golfers.length,
        golfers: golfers,
      });
    })
    .catch((err) => res.status(404).json("Error: " + err));
});

router.route("/postScore").post((req, res) => {
  Dogfight.findById(req.body.dogfightId)
    .then((dogfight) => {
      Golfer.findById(req.body.golferId)
        .then((golfer) => {
          for (i = 0; i < dogfight.active_golfers.length; i++) {
            g = dogfight.active_golfers[i];

            if (g.golferId === golfer.id) {
              dogfight.active_golfers[i].score = req.body.score;
              dogfight.save();

              golfer.scores.push({
                score: req.body.score,
                course: dogfight.course,
                date: dogfight.date,
              });

              golfer.save();
            }
          }

          res.json(dogfight);
        })
        .catch((err) => res.status(500).json("Error: " + err));
    })
    .catch((err) => {
      res.json("error");
    });
});

// Sort the dogfights by newest to oldest
const compare = (a, b) => {
  if (a.date < b.date) {
    return 1;
  } else if (a.date > b.date) {
    return -1;
  }
  return 0;
};

module.exports = router;
