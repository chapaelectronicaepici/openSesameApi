import mongoose from "mongoose";
import { Router } from "express";
import Schedule from "../models/Schedule";

const ScheduleRouter = Router();

ScheduleRouter.get("/", (req, res) => {
  Schedule.paginate({}, { page, limit: 10 })
    .then(function(result) {
      res.json(result);
    })
    .catch(err => {
      res.send(err);
    });
});

ScheduleRouter.get("/activas", (req, res) => {
  let query = Schedule.find({ estado: true });
  query.exec((err, schedules) => {
    if (err) {
      return res.send({
        message: err,
        error: true
      });
    }
    res.json({
      data: schedules,
      error: false
    });
  });
});

ScheduleRouter.post("/", (req, res) => {
  var newSchedule = new Schedule(req.body);
  newSchedule.save((err, schedule) => {
    if (err) {
      return res.json({
        message: err,
        error: true
      });
    }
    res.json({
      data: schedule,
      error: false
    });
  });
});

ScheduleRouter.get("/:id", (req, res) => {
  Schedule.findById(req.params.id, (err, schedule) => {
    if (err) {
      return res.send({
        message: err,
        error: true
      });
    }
    res.json({
      data: schedule,
      error: false
    });
  });
});

ScheduleRouter.delete("/:id", (req, res) => {
  Schedule.remove({ _id: req.params.id }, (err, result) => {
    if (err) {
      return res.send(err);
    }
    res.json({
      result
    });
  });
});

ScheduleRouter.put("/:id", (req, res) => {
  Schedule.findOneAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, schedule) => {
      if (err) {
        return res.send(err);
      }
      res.json({
        data: schedule,
        error: false
      });
    }
  );
});

export default ScheduleRouter;
