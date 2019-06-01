"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _User = require("./User");

var _User2 = _interopRequireDefault(_User);

var _mongoosePaginate = require("mongoose-paginate");

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userSchema = _User2.default.schema;

var Schema = _mongoose2.default.Schema;

var CourseSchema = new Schema({
  name: { type: String },
  user: { type: userSchema, required: true },
  createAt: { type: Date, default: new Date() }
}, {
  versionKey: false
});

CourseSchema.plugin(_mongoosePaginate2.default);
exports.default = _mongoose2.default.model("course", CourseSchema);