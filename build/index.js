"use strict";

var _socket = require("socket.io");

var _socket2 = _interopRequireDefault(_socket);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _http = require("http");

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _helmet = require("helmet");

var _helmet2 = _interopRequireDefault(_helmet);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _usuario = require("./routes/usuario.route");

var _usuario2 = _interopRequireDefault(_usuario);

var _alerta = require("./routes/alerta.route");

var _alerta2 = _interopRequireDefault(_alerta);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Constant */


/* Routes */
var app = (0, _express2.default)();
var server = (0, _http.createServer)(app);

/* Configuration */

_mongoose2.default.connect(_config2.default.DBHOST, _config2.default.DBOPTIONS);

var database = _mongoose2.default.connection;
database.on("error", console.error.bind(console, "Connection Error"));

/* Midleware */
app.all("*", function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use((0, _morgan2.default)("dev"));
app.use((0, _helmet2.default)());
app.use(_bodyParser2.default.urlencoded({
  extended: true
}));

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.json({ type: "application/json" }));

/* routes */
app.use(_express2.default.static(_path2.default.join(__dirname, "../public")));

app.use("/usuario", _usuario2.default);
app.use("/alerta", _alerta2.default);

/* Server */
server.listen(_config2.default.PORT, function () {
  console.log("Servidor ejecutandoce en puerto: ", _config2.default.PORT);
});

var io = (0, _socket2.default)(server);

io.of("/socket").on("connection", function (socket) {
  console.log("Nueva conexion", socket.id);
  socket.on("alert:new", function (data) {
    io.of("/socket").emit("alert:web", data);
  });
  socket.on("alert:updated", function (data) {
    io.of("/socket").emit("alert:recieveUpdated", data);
  });
});