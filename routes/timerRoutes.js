const mongoose = require("mongoose");
const Timer = mongoose.model("timers");

module.exports = app => {
  // add timer
  app.post("/api/newTimer", (req, res) => {
    const timer = new Timer({
      ...req.body,
      _user: req.user.id,
      creationDate: Date.now()
    });
    timer.save();
    res.send("Timer post req done");
  });

  // fetch all timers for 1 recipe
  app.get("/api/timers/:recipeId", (req, res, next) => {
    const id = req.params.recipeId;

    Timer.find({ recipeId: id })
      .populate("_user")
      .sort("-creationDate")
      .exec()
      .then(doc => {
        // console.log("From database", doc);
        if (doc) {
          res.status(200).json(doc);
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  });

  app.get("/api/timers", (req, res, next) => {
    if (req.user) {
      Timer.find({ _user: req.user.id })
        .populate("_user")
        .exec()
        .then(docs => {
          res.status(200).json(docs);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
    } else {
      res.send("please login");
    }
  });

  // fetch single timer
  app.get("/api/timers/:timerId", (req, res, next) => {
    const id = req.params.timerId;
    // console.log(id)
    Timer.findById(id)
      .populate("_user")
      .exec()
      .then(doc => {
        // console.log("From database", doc);
        if (doc) {
          res.status(200).json(doc);
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        // console.log(err);
        res.status(500).json({ error: err });
      });
  });

  // update single timer
  app.patch("/api/timers/update/:timerId", (req, res, next) => {
    const id = req.params.timerId;
    Timer.update(
      { _id: id },
      {
        $set: {
          ...req.body
        }
      }
    )
      .exec()
      .then(result => {
        // console.log(result);
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

  // Delete single Timer
  app.delete("/api/timers/delete/:timerId", (req, res, next) => {
    const id = req.params.timerId;
    Timer.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
};
