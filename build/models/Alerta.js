"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Usuario = require("./Usuario");

var _Usuario2 = _interopRequireDefault(_Usuario);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var usuarioSchema = _Usuario2.default.schema;

var Schema = _mongoose2.default.Schema;

var AlertaSchema = new Schema({
  descripcion: { type: String },
  ubicacionInicialLatitud: { type: String, required: true },
  ubicacionInicialLongitud: { type: String, required: true },
  usuario: { type: usuarioSchema, required: true },
  estado: { type: Boolean, default: true },
  creadoEn: { type: Date, default: new Date() }
}, {
  versionKey: false
});

exports.default = _mongoose2.default.model("alerta", AlertaSchema);