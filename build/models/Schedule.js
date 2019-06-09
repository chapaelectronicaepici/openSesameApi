"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var ScheduleSchema = new Schema({
  day: { type: Number, required: true },
  startTime: { type: Date, default: new Date(), required: true },
  endTime: { type: Date, default: new Date(), required: true },
  createAt: { type: Date, default: new Date() }
}, {
  versionKey: false
});

exports.default = _mongoose2.default.model("schedule", ScheduleSchema);