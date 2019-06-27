"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _express = require("express");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _config = require("../config");

var _config2 = _interopRequireDefault(_config);

var _User = require("../models/User");

var _User2 = _interopRequireDefault(_User);

var _Course = require("../models/Course");

var _Course2 = _interopRequireDefault(_Course);

var _services = require("../services");

var _middleware = require("../middleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserRouter = (0, _express.Router)();

UserRouter.get("/", _middleware.checkTokenAdministrator, function (req, res) {
  var page = req.query.page || 1;
  var roleParam = req.query.role || false;
  var query = {};
  if (roleParam) {
    query.role = roleParam;
  }
  _User2.default.find(query).then(function (result) {
    res.json(result);
  }).catch(function (err) {
    res.send(err);
  });
});

UserRouter.post("/", function (req, res) {
  var body = req.body;
  body.password = _bcrypt2.default.hashSync(body.password, _config2.default.SALT_ROUNDS);
  var newUser = new _User2.default(body);
  newUser.save(function (err, user) {
    if (err) {
      return res.json({
        message: err,
        error: true
      });
    }
    res.json({
      data: user,
      token: (0, _services.createToken)(user),
      error: false
    });
  });
});

UserRouter.post("/login", function (req, res) {
  _User2.default.findOne({
    email: req.body.email,
    password: _bcrypt2.default.hashSync(req.body.password, _config2.default.SALT_ROUNDS)
  }, {
    password: false
  }, function (err, user) {
    if (err) {
      return res.json({
        message: err,
        error: true
      });
    }

    if (user !== null) {
      res.json({
        data: user,
        token: (0, _services.createToken)(user),
        error: false
      });
    } else {
      res.json({
        error: true
      });
    }
  });
});

UserRouter.get("/:id", _middleware.checkToken, function (req, res) {
  var _req$decoded$data = req.decoded.data,
      id = _req$decoded$data.id,
      role = _req$decoded$data.role;

  var idUser = req.params.id;
  if (idUser !== id && role !== "administrator") {
    return res.send({
      error: true,
      message: "Unauthorized user"
    });
  }
  _User2.default.findById(idUser, function (err, usuario) {
    if (err) {
      return res.json({
        error: true,
        message: err
      });
    }
    res.json({
      error: false,
      user: usuario
    });
  });
});

UserRouter.get("/data/me", _middleware.checkToken, function (req, res) {
  var id = req.decoded.data.id;

  _User2.default.findById(id, function (err, usuario) {
    if (err) {
      return res.send({
        error: true,
        message: err
      });
    }
    res.json(usuario);
  });
});

UserRouter.get("/data/isValidTime", _middleware.checkToken, function (req, res) {
  var baseDate = (0, _moment2.default)().day(1).set({
    minutes: 0,
    hours: 0
  });
  var currentTime = (0, _moment2.default)();
  var id = req.decoded.data.id;

  _Course2.default.find({
    user: id
  }).populate("user").lean().then(function (courses) {
    // console.log("courses", courses);
    courses.forEach(function (_ref) {
      var schedules = _ref.schedules;

      schedules.forEach(function (schedule) {
        var durationStart = (0, _moment2.default)(schedule.startTime);
        var durationEnd = (0, _moment2.default)(schedule.endTime);
        var start = baseDate.clone().add({
          days: schedule.day,
          minutes: durationStart.minutes(),
          hours: durationStart.hours(),
          seconds: durationStart.seconds()
        });
        var end = baseDate.clone().add({
          days: schedule.day,
          minutes: durationEnd.minutes(),
          hours: durationEnd.hours(),
          seconds: durationEnd.seconds()
        });
        console.log("Fecha", start.format("DD-MM-YYYY-HH:mm"), end.format("DD-MM-YYYY-HH:mm"), currentTime.format("DD-MM-YYYY HH:mm"));
      });
    });
    res.json(courses);
  }).catch(function (err) {
    res.send(err);
  });
});

UserRouter.delete("/:id", _middleware.checkToken, function (req, res) {
  var _req$decoded$data2 = req.decoded.data,
      id = _req$decoded$data2.id,
      role = _req$decoded$data2.role;

  var idUser = req.params.id;
  if (idUser !== id && role !== "administrator") {
    return res.send({
      error: true,
      message: "Unauthorized user"
    });
  }
  _User2.default.remove({ _id: req.params.id }, function (err, result) {
    if (err) {
      return res.send(err);
    }
    res.json({
      message: "User satisfactoriamente eliminado",
      result: result
    });
  });
});

UserRouter.put("/:id", _middleware.checkToken, function (req, res) {
  var _req$decoded$data3 = req.decoded.data,
      id = _req$decoded$data3.id,
      role = _req$decoded$data3.role;

  var idUser = req.params.id;
  if (idUser !== id && role !== "administrator") {
    return res.send({
      error: true,
      message: "Unauthorized user"
    });
  }
  _User2.default.findById({ _id: req.params.id }, function (err, usuario) {
    if (err) {
      return res.send(err);
    }
    var body = req.body;
    if (body.password.trim() !== "") {
      body.password = _bcrypt2.default.hashSync(body.password.trim(), _config2.default.SALT_ROUNDS);
    } else {
      delete body.password;
    }
    Object.assign(usuario, req.body).save(function (err, usuario) {
      if (err) {
        return res.send(err);
      }
      res.json({
        message: "User satisfactoriamente modificado",
        usuario: usuario
      });
    });
  });
});

exports.default = UserRouter;