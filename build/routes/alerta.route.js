"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require("express");

var _Alerta = require("../models/Alerta");

var _Alerta2 = _interopRequireDefault(_Alerta);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AlertaRouter = (0, _express.Router)();

AlertaRouter.get("/", function (req, res) {
  var query = _Alerta2.default.find({});
  query.exec(function (err, alertas) {
    if (err) {
      return res.send(err);
    }
    res.json(alertas);
  });
});

AlertaRouter.get("/activas", function (req, res) {
  var query = _Alerta2.default.find({ estado: true });
  query.exec(function (err, alertas) {
    if (err) {
      return res.send({
        message: err,
        error: true
      });
    }
    res.json({
      message: "Alerta satisfactoriamente agregado",
      data: alertas,
      error: false
    });
  });
});

AlertaRouter.post("/", function (req, res) {
  var newAlerta = new _Alerta2.default(req.body);
  newAlerta.save(function (err, alerta) {
    if (err) {
      return res.json({
        message: err,
        error: true
      });
    }
    res.json({
      message: "Alerta satisfactoriamente agregado",
      data: alerta,
      error: false
    });
  });
});

AlertaRouter.get("/:id", function (req, res) {
  _Alerta2.default.findById(req.params.id, function (err, alerta) {
    if (err) {
      return res.send({
        message: err,
        error: true
      });
    }
    res.json({
      message: "Alerta recuperada",
      data: alerta,
      error: false
    });
  });
});

AlertaRouter.get("/lastByUser/:idUsuario", function (req, res) {
  _Alerta2.default.findOne({
    "usuario._id": req.params.idUsuario,
    estado: true
  }, function (err, alerta) {
    if (err) {
      return res.send({
        message: err,
        error: true
      });
    }
    console.log("newAlerta: ", alerta);
    res.json({
      message: "Alerta recuperada",
      data: alerta,
      error: false
    });
  });
});

AlertaRouter.put("/lastByUser/:idUsuario", function (req, res) {
  _Alerta2.default.findOneAndUpdate({
    "usuario._id": req.params.idUsuario,
    estado: true
  }, req.body, { new: true }, function (err, alerta) {
    if (err) {
      return res.send({
        message: err,
        error: true
      });
    }
    res.json({
      message: "Alerta actualizada",
      data: alerta,
      error: false
    });
  });
});

AlertaRouter.delete("/", function (req, res) {
  _Alerta2.default.remove({ _id: req.params.id }, function (err, result) {
    if (err) {
      return res.send(err);
    }
    res.json({
      message: "Alerta satisfactoriamente eliminado",
      result: result
    });
  });
});

AlertaRouter.put("/:id", function (req, res) {
  _Alerta2.default.findOneAndUpdate(req.params.id, req.body, { new: true }, function (err, alerta) {
    if (err) {
      return res.send(err);
    }
    res.json({
      message: "Alerta satisfactoriamente modificado",
      data: alerta,
      error: false
    });
  });
});

exports.default = AlertaRouter;