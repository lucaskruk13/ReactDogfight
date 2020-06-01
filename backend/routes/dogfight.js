const router = require("express").Router();
const mongoose = require("mongoose");
let Dogfight = require("../models/dogfight.model");
let Golfer = require("../models/golfer.model");

router.route("/").get((req, res) => {
  Dogfight.find()
    .then((dogfight) => {
      return [res.json(dogfight.sort(compare).slice(0, 2))];
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/upcoming").get((req, res) => {
  Dogfight.find()

    .then((dogfights) => {
      var temp = dogfights.map((d) =>
        Math.abs(new Date() - new Date(d.date).getTime())
      );
      var idx = temp.indexOf(Math.min(...temp));

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

router.route("/addGolfer/").post((req, res) => {
  Dogfight.findById(req.body.dogfightId)
    .then((dogfight) => {
      Golfer.findById(req.body.golferId)
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
            .then((df) => res.send("Fix this Lucas"))
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

router.route("/postScoreForDogfight").post((req, res) => {
  console.log(req.body);

  Dogfight.findById(req.body.dogfight)
    .then((dogfight) => {
      dogfight.active_golfers.forEach((golfer) => {
        if (golfer._id.toString() === req.body.scoreObjectId) {
          // Check to see if the golfer is in the game
          golfer.score = req.body.score;

          Golfer.findById(golfer.golferId) // We need to also update the golfer itself
            .then((g) => {
              const [instance] = g.scores.filter(
                //we need only one, destructure
                // Dont forget to destructure
                (score) => score.dogfight === dogfight._id.toString()
              );

              if (!instance) {
                // If the doe not exist, create
                const scoreObject = {
                  score: req.body.score,
                  course: dogfight.course,
                  date: dogfight.date,
                  dogfight: dogfight._id,
                };
                console.log(scoreObject);
                g.scores.push(scoreObject);
              } else {
                // Update
                g.scores.forEach((score) => {
                  const localDogfight = score.dogfight;
                  const dogfightID = dogfight._id.toString();
                  if (score.dogfight === dogfight._id.toString()) {
                    score.score = req.body.score;
                  }
                });
              }
              g.save();
              dogfight.save();
            })
            .catch((err) => cres.status(500).json(err));
        }
      });
    })
    .catch((err) => res.status(500).json(err));
  res.json({ status: 200, OK: true });
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
