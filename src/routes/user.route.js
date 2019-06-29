import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Router } from "express";
import moment from "moment";
import config from "../config";
import User from "../models/User";
import Course from "../models/Course";
import { createToken } from "../services";
import { checkTokenAdministrator, checkToken } from "../middleware";
const UserRouter = Router();

UserRouter.get("/", checkTokenAdministrator, (req, res) => {
  const page = req.query.page || 1;
  const roleParam = req.query.role || false;
  const query = {};
  if (roleParam) {
    query.role = roleParam;
  }
  User.find(query)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.send(err);
    });
});

UserRouter.post("/", (req, res) => {
  const body = req.body;
  body.password = bcrypt.hashSync(body.password, config.SALT_ROUNDS);
  const newUser = new User(body);
  newUser.save((err, user) => {
    if (err) {
      return res.json({
        message: err,
        error: true
      });
    }
    res.json({
      data: user,
      token: createToken(user),
      error: false
    });
  });
});

UserRouter.post("/login", (req, res) => {
  User.findOne(
    {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, config.SALT_ROUNDS)
    },
    {
      password: false
    },
    (err, user) => {
      if (err) {
        return res.json({
          message: err,
          error: true
        });
      }

      if (user !== null) {
        res.json({
          data: user,
          token: createToken(user),
          error: false
        });
      } else {
        res.json({
          error: true
        });
      }
    }
  );
});

UserRouter.get("/:id", checkToken, (req, res) => {
  const {
    decoded: {
      data: { id, role }
    }
  } = req;
  const idUser = req.params.id;
  if (idUser !== id && role !== "administrator") {
    return res.send({
      error: true,
      message: "Unauthorized user"
    });
  }
  User.findById(idUser, (err, usuario) => {
    if (err) {
      return res.json({
        error: true,
        message: err
      });
    }
    res.json({
      error: false,
      user: usuario
    });
  });
});

UserRouter.get("/data/me", checkToken, (req, res) => {
  const {
    decoded: {
      data: { id }
    }
  } = req;
  User.findById(id, (err, usuario) => {
    if (err) {
      return res.send({
        error: true,
        message: err
      });
    }
    res.json(usuario);
  });
});

UserRouter.get("/data/isValidTime", checkToken, (req, res) => {
  const baseDate = moment()
    .day(1)
    .set({
      minutes: 0,
      hours: 0
    });
  const currentTime = moment();
  const {
    decoded: {
      data: { id }
    }
  } = req;
  Course.find({
    user: id
  })
    .populate("user")
    .lean()
    .then(courses => {
      courses.forEach(({ schedules }) => {
        schedules.forEach(schedule => {
          console.log("schedule", schedule);
          const durationStart = moment(schedule.startTime);
          const durationEnd = moment(schedule.endTime);

          const startDate = baseDate.clone().add({
            days: schedule.day,
            minutes: durationStart.minutes(),
            hours: durationStart.hours(),
            seconds: durationStart.seconds()
          });
          const endDate = baseDate.clone().add({
            days: schedule.day,
            minutes: durationEnd.minutes(),
            hours: durationEnd.hours(),
            seconds: durationEnd.seconds()
          });
          if (currentTime.isBetween(startDate, endDate)) {
            console.log(
              "Fecha",
              startDate.format("DD-MM-YYYY HH:mm"),
              endDate.format("DD-MM-YYYY HH:mm"),
              currentTime.format("DD-MM-YYYY HH:mm")
            );
            res.json({
              isValidTime: false
            });
          }
        });
      });
      res.json({
        isValidTime: true
      });
    })
    .catch(err => {
      res.send(err);
    });
});

UserRouter.delete("/:id", checkToken, (req, res) => {
  const {
    decoded: {
      data: { id, role }
    }
  } = req;
  const idUser = req.params.id;
  if (idUser !== id && role !== "administrator") {
    return res.send({
      error: true,
      message: "Unauthorized user"
    });
  }
  User.remove({ _id: req.params.id }, (err, result) => {
    if (err) {
      return res.send(err);
    }
    res.json({
      message: "User satisfactoriamente eliminado",
      result
    });
  });
});

UserRouter.put("/:id", checkToken, (req, res) => {
  const {
    decoded: {
      data: { id, role }
    }
  } = req;
  const idUser = req.params.id;
  if (idUser !== id && role !== "administrator") {
    return res.send({
      error: true,
      message: "Unauthorized user"
    });
  }
  User.findById({ _id: req.params.id }, (err, usuario) => {
    if (err) {
      return res.send(err);
    }
    const body = req.body;
    if (body.password.trim() !== "") {
      body.password = bcrypt.hashSync(body.password.trim(), config.SALT_ROUNDS);
    } else {
      delete body.password;
    }
    Object.assign(usuario, req.body).save((err, usuario) => {
      if (err) {
        return res.send(err);
      }
      res.json({
        message: "User satisfactoriamente modificado",
        usuario
      });
    });
  });
});

export default UserRouter;
