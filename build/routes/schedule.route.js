"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require("express");

var _Schedule = require("../models/Schedule");

var _Schedule2 = _interopRequireDefault(_Schedule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ScheduleRouter = (0, _express.Router)();

ScheduleRouter.get("/", function (req, res) {
  _Schedule2.default.paginate({}, { page: page, limit: 10 }).then(function (result) {
    res.json(result);
  }).catch(function (err) {
    res.send(err);
  });
});

ScheduleRouter.get("/activas", function (req, res) {
  var query = _Schedule2.default.find({ estado: true });
  query.exec(function (err, schedules) {
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

ScheduleRouter.post("/", function (req, res) {
  var newSchedule = new _Schedule2.default(req.body);
  newSchedule.save(function (err, schedule) {
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

ScheduleRouter.get("/:id", function (req, res) {
  _Schedule2.default.findById(req.params.id, function (err, schedule) {
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

ScheduleRouter.delete("/:id", function (req, res) {
  _Schedule2.default.remove({ _id: req.params.id }, function (err, result) {
    if (err) {
      return res.send(err);
    }
    res.json({
      result: result
    });
  });
});

ScheduleRouter.put("/:id", function (req, res) {
  _Schedule2.default.findOneAndUpdate(req.params.id, req.body, { new: true }, function (err, schedule) {
    if (err) {
      return res.send(err);
    }
    res.json({
      data: schedule,
      error: false
    });
  });
});

exports.default = ScheduleRouter;