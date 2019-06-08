import socket from "socket.io";
import express, { Router } from "express";
import path from "path";
import { createServer } from "http";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import config from "./config";
import mongoose from "mongoose";

/* Routes */
import userRoute from "./routes/user.route";
import courseRoute from "./routes/course.route";
import scheduleRoute from "./routes/schedule.route";
/* Constant */
const app = express();
const server = createServer(app);
const router = Router();

/* Configuration */

mongoose.connect(config.DBHOST, config.DBOPTIONS);

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
    "X-Requested-With,content-type,authorization"
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

router.use("/users", userRoute);
router.use("/courses", courseRoute);
router.use("/schedules", scheduleRoute);

app.use("/api/", router);
/* Server */
server.listen(config.PORT, () => {
  console.log("Servidor ejecutandoce en puerto: ", config.PORT);
});

const io = socket(server);

io.of("/socket").on("connection", socket => {
  socket.on("course:new", data => {
    io.of("/socket").emit("course:web", data);
  });
  socket.on("course:updated", data => {
    io.of("/socket").emit("course:recieveUpdated", data);
  });

  socket.on("course:atencion", data => {
    io.of("/socket").emit("course:emitirAtencio", data);
  });
});
