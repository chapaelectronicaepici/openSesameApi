"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var UsuarioSchema = new Schema({
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true },
  dni: { type: String, required: true },
  correo: { type: String, required: true },
  clave: { type: String },
  tipo: { type: String, required: true },
  estado: { type: Boolean, default: true },
  creadoEn: { type: Date, default: new Date() }
}, {
  versionKey: false
});

exports.default = _mongoose2.default.model("usuario", UsuarioSchema);