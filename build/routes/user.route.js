"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _express = require("express");

var _config = require("../config");

var _config2 = _interopRequireDefault(_config);

var _User = require("../models/User");

var _User2 = _interopRequireDefault(_User);

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
  _User2.default.paginate(query, { page: page, limit: 10 }).then(function (result) {
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
      return res.send(err);
    }
    res.json(usuario);
  });
});

UserRouter.delete("/:id", function (req, res) {
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

UserRouter.put("/:id", function (req, res) {
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