"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Schedule = require("./Schedule");

var _Schedule2 = _interopRequireDefault(_Schedule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;

var Schema = _mongoose2.default.Schema;
var CourseSchema = new Schema({
  name: { type: String },
  user: { type: ObjectId, required: true, ref: "user" },
  schedules: [_defineProperty({ type: Array }, "type", _Schedule2.default.schema)],
  createAt: { type: Date, default: new Date() }
}, {
  versionKey: false
});

exports.default = _mongoose2.default.model("course", CourseSchema);