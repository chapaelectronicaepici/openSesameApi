"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = require("mongoose-paginate");

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var ScheduleSchema = new Schema({
  day: { type: Number },
  startTime: { type: Date, default: new Date() },
  endTime: { type: Date, default: new Date() },
  createAt: { type: Date, default: new Date() }
}, {
  versionKey: false
});

ScheduleSchema.plugin(_mongoosePaginate2.default);
exports.default = _mongoose2.default.model("schedule", ScheduleSchema);