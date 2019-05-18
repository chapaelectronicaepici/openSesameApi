import mongoose from "mongoose";
import { Router } from "express";
import User from "../models/User";

const UserRouter = Router();

UserRouter.get("/", (req, res) => {
  let query = User.find({});
  query.exec((err, usuarios) => {
    if (err) {
      return res.send(err);
    }
    res.json({
      error: false,
      data: usuarios
    });
  });
});

UserRouter.post("/", (req, res) => {
  var newUser = new User(req.body);
  newUser.save((err, usuario) => {
    if (err) {
      return res.json({
        message: err,
        error: true
      });
    }
    delete usuario.clave;
    res.json({
      message: "User satisfactoriamente agregado",
      data: usuario,
      error: false
    });
  });
});

UserRouter.post("/login", (req, res) => {
  User.findOne(
    {
      correo: req.body.correo,
      clave: req.body.clave
    },
    {
      clave: false,
    },
    (err, usuario) => {
      if (err) {
        return res.json({
          message: err,
          error: true
        });
      }

      if (usuario !== null) {
        res.json({
          message: "User encontrado",
          data: usuario,
          error: false
        });
      } else {
        res.json({
          message: "Credenciales incorrectas.",
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
