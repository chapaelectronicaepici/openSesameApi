"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createToken = undefined;

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createToken = exports.createToken = function createToken(user) {
  var payload = {
    sub: user._id,
    data: {
      role: user.role,
      id: user._id
    },
    iat: (0, _moment2.default)().unix(),
    exp: (0, _moment2.default)().add(14, "days").unix()
  };
  return _jsonwebtoken2.default.sign(payload, _config2.default.SECRET);
};