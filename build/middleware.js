"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkTokenAdministrator = exports.checkToken = undefined;

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkToken = exports.checkToken = function checkToken(req, res, next) {
  var token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
  if (token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    _jsonwebtoken2.default.verify(token, _config2.default.SECRET, function (err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: "Token is not valid"
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: "Auth token is not supplied"
    });
  }
};

var checkTokenAdministrator = exports.checkTokenAdministrator = function checkTokenAdministrator(req, res, next) {
  var token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
  if (token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    _jsonwebtoken2.default.verify(token, _config2.default.SECRET, function (err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: "Token is not valid"
        });
      } else {
        req.decoded = decoded;
        if (decoded.data.role === "administrator") {
          next();
        } else {
          res.send({
            error: true,
            message: "Unauthorized user"
          });
        }
      }
    });
  } else {
    return res.json({
      success: false,
      message: "Auth token is not supplied"
    });
  }
};