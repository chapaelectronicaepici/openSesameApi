import socket from "socket.io";
import express from "express";
import path from "path";
import { createServer } from "http";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import config from "./config";
import mongoose from "mongoose";

/* Routes */
import usuarioRoute from "./routes/usuario.route";
import alertaRoute from "./routes/alerta.route";
/* Constant */
const app = express();
const server = createServer(app);

/* Configuration */

mongoose.connect(
  config.DBHOST,
  config.DBOPTIONS
);

let database = mongoose.connection;
database.on("error", console.error.bind(console, "Connection Error"));

/* Midleware */
app.all("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(morgan("dev"));
app.use(helmet());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/json" }));

/* routes */
app.use(express.static(path.join(__dirname, "../public")));

app.use("/usuario", usuarioRoute);
app.use("/alerta", alertaRoute);

/* Server */
server.listen(config.PORT, () => {
  console.log("Servidor ejecutandoce en puerto: ", config.PORT);
});

const io = socket(server);


io.of("/socket").on("connection", socket => {
  console.log("Nueva conexion", socket.id);
  socket.on("alert:new", data => {
    io.of("/socket").emit("alert:web", data);
  });
  socket.on("alert:updated", data => {
    io.of("/socket").emit("alert:recieveUpdated", data);
  });

  socket.on("alert:atencion", data => {
    io.of("/socket").emit("alert:emitirAtencio", data);
  });
});
