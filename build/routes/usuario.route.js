"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require("express");

var _Usuario = require("../models/Usuario");

var _Usuario2 = _interopRequireDefault(_Usuario);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UsuarioRouter = (0, _express.Router)();

UsuarioRouter.get("/", function (req, res) {
  var query = _Usuario2.default.find({});
  query.exec(function (err, usuarios) {
    if (err) {
      return res.send(err);
    }
    res.json({
      error: false,
      data: usuarios
    });
  });
});

UsuarioRouter.post("/", function (req, res) {
  var newUsuario = new _Usuario2.default(req.body);
  newUsuario.save(function (err, usuario) {
    if (err) {
      return res.json({
        message: err,
        error: true
      });
    }
    delete usuario.clave;
    res.json({
      message: "Usuario satisfactoriamente agregado",
      data: usuario,
      error: false
    });
  });
});

UsuarioRouter.post("/login", function (req, res) {
  _Usuario2.default.findOne({
    correo: req.body.correo,
    clave: req.body.clave
  }, {
    clave: false
  }, function (err, usuario) {
    if (err) {
      return res.json({
        message: err,
        error: true
      });
    }

    if (usuario !== null) {
      res.json({
        message: "Usuario encontrado",
        data: usuario,
        error: false
      });
    } else {
      res.json({
        message: "Credenciales incorrectas.",
        error: true
      });
    }
  });
});

UsuarioRouter.get("/:id", function (req, res) {
  _Usuario2.default.findById(req.params.id, function (err, usuario) {
    if (err) {
      return res.send(err);
    }
    res.json(usuario);
  });
});

UsuarioRouter.delete("/", function (req, res) {
  _Usuario2.default.remove({ _id: req.params.id }, function (err, result) {
    if (err) {
      return res.send(err);
    }
    res.json({
      message: "Usuario satisfactoriamente eliminado",
      result: result
    });
  });
});

UsuarioRouter.put("/", function (req, res) {
  _Usuario2.default.findById({ _id: req.params.id }, function (err, usuario) {
    if (err) {
      return res.send(err);
    }
    Object.assign(usuario, req.body).save(function (err, usuario) {
      if (err) {
        return res.send(err);
      }
      res.json({
        message: "Usuario satisfactoriamente modificado",
        usuario: usuario
      });
    });
  });
});

exports.default = UsuarioRouter;