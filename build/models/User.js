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

var UserSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  dni: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, select: false },
  role: { type: String, required: true },
  createAt: { type: Date, default: new Date() }
}, {
  versionKey: false
});

UserSchema.plugin(_mongoosePaginate2.default);

exports.default = _mongoose2.default.model("user", UserSchema);