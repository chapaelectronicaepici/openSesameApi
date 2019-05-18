import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Router } from "express";

import config from "../config";
import User from "../models/User";
const UserRouter = Router();

UserRouter.get("/", (req, res) => {
  const page = req.query.page || 1;
  User.paginate({}, { page, limit: 10 })
    .then(function(result) {
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
    delete user.password;
    res.json({
      data: user,
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

UserRouter.get("/:id", (req, res) => {
  User.findById(req.params.id, (err, usuario) => {
    if (err) {
      return res.send(err);
    }
    res.json(usuario);
  });
});

UserRouter.delete("/", (req, res) => {
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

UserRouter.put("/", (req, res) => {
  User.findById({ _id: req.params.id }, (err, usuario) => {
    if (err) {
      return res.send(err);
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
