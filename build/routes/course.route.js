"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require("express");

var _Course = require("../models/Course");

var _Course2 = _interopRequireDefault(_Course);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CourseRouter = (0, _express.Router)();

CourseRouter.get("/", function (req, res) {
  _Course2.default.paginate({}, { page: page, limit: 10 }).then(function (result) {
    res.json(result);
  }).catch(function (err) {
    res.send(err);
  });
});

CourseRouter.get("/activas", function (req, res) {
  var query = _Course2.default.find({ estado: true });
  query.exec(function (err, courses) {
    if (err) {
      return res.send({
        message: err,
        error: true
      });
    }
    res.json({
      data: courses,
      error: false
    });
  });
});

CourseRouter.post("/", function (req, res) {
  var newCourse = new _Course2.default(req.body);
  newCourse.save(function (err, course) {
    if (err) {
      return res.json({
        message: err,
        error: true
      });
    }
    res.json({
      data: course,
      error: false
    });
  });
});

CourseRouter.get("/:id", function (req, res) {
  _Course2.default.findById(req.params.id, function (err, course) {
    if (err) {
      return res.send({
        message: err,
        error: true
      });
    }
    res.json({
      data: course,
      error: false
    });
  });
});

CourseRouter.delete("/:id", function (req, res) {
  _Course2.default.remove({ _id: req.params.id }, function (err, result) {
    if (err) {
      return res.send(err);
    }
    res.json({
      result: result
    });
  });
});

CourseRouter.put("/:id", function (req, res) {
  _Course2.default.findOneAndUpdate(req.params.id, req.body, { new: true }, function (err, course) {
    if (err) {
      return res.send(err);
    }
    res.json({
      data: course,
      error: false
    });
  });
});

exports.default = CourseRouter;