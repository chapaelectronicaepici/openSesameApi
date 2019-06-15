"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require("express");

var _Course = require("../models/Course");

var _Course2 = _interopRequireDefault(_Course);

var _User = require("../models/User");

var _User2 = _interopRequireDefault(_User);

var _middleware = require("../middleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CourseRouter = (0, _express.Router)();

CourseRouter.get("/", _middleware.checkToken, function (req, res) {
  var role = req.decoded.data.role;

  if (role !== "administrator") {
    return res.send({
      error: true,
      message: "Unauthorized user"
    });
  }
  _Course2.default.find({}).populate("user").then(function (result) {
    res.json(result);
  }).catch(function (err) {
    res.send(err);
  });
});

CourseRouter.post("/", _middleware.checkToken, function (req, res) {
  var role = req.decoded.data.role;

  if (role !== "administrator") {
    return res.send({
      error: true,
      message: "Unauthorized user"
    });
  }
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

CourseRouter.get("/:id", _middleware.checkToken, function (req, res) {
  var role = req.decoded.data.role;

  if (role !== "administrator") {
    return res.send({
      error: true,
      message: "Unauthorized user"
    });
  }
  _Course2.default.findOne({ _id: req.params.id }).populate("user").exec(function (err, course) {
    if (err) {
      return res.send({
        message: err,
        error: true
      });
    }
    res.json({
      course: course,
      error: false
    });
  });
});

CourseRouter.delete("/:id", _middleware.checkToken, function (req, res) {
  var role = req.decoded.data.role;

  if (role !== "administrator") {
    return res.send({
      error: true,
      message: "Unauthorized user"
    });
  }
  _Course2.default.remove({ _id: req.params.id }, function (err, result) {
    if (err) {
      return res.send(err);
    }
    res.json({
      result: result
    });
  });
});

CourseRouter.put("/:id", _middleware.checkToken, function (req, res) {
  var role = req.decoded.data.role;

  if (role !== "administrator") {
    return res.send({
      error: true,
      message: "Unauthorized user"
    });
  }
  _Course2.default.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, course) {
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