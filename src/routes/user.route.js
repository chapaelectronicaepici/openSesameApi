import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Router } from "express";

import config from "../config";
import User from "../models/User";
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
  User.paginate(query, { page, limit: 10 })
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
      return res.send(err);
    }
    res.json(usuario);
  });
});

UserRouter.delete("/:id", (req, res) => {
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

UserRouter.put("/:id", (req, res) => {
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
