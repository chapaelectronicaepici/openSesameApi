"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
exports.default = {
  DBHOST: process.env.MONGO_DATABASE,
  DBOPTIONS: {
    useNewUrlParser: true
  },
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  PORT: process.env.PORT,
  SECRET: process.env.SECRET
};