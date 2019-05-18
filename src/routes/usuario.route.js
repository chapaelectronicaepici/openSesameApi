import mongoose from "mongoose";
import { Router } from "express";
import Usuario from "../models/Usuario";

const UsuarioRouter = Router();

UsuarioRouter.get("/", (req, res) => {
  let query = Usuario.find({});
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

UsuarioRouter.post("/", (req, res) => {
  var newUsuario = new Usuario(req.body);
  newUsuario.save((err, usuario) => {
    if (err) {
      return res.json({
        message: err,
        error: true
      });
    }
    delete usuario.clave;
    res.json({
      message: "Usuario satisfactoriamente agregado",
      data: usuario,
      error: false
    });
  });
});

UsuarioRouter.post("/login", (req, res) => {
  Usuario.findOne(
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
          message: "Usuario encontrado",
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

UsuarioRouter.get("/:id", (req, res) => {
  Usuario.findById(req.params.id, (err, usuario) => {
    if (err) {
      return res.send(err);
    }
    res.json(usuario);
  });
});

UsuarioRouter.delete("/", (req, res) => {
  Usuario.remove({ _id: req.params.id }, (err, result) => {
    if (err) {
      return res.send(err);
    }
    res.json({
      message: "Usuario satisfactoriamente eliminado",
      result
    });
  });
});

UsuarioRouter.put("/", (req, res) => {
  Usuario.findById({ _id: req.params.id }, (err, usuario) => {
    if (err) {
      return res.send(err);
    }
    Object.assign(usuario, req.body).save((err, usuario) => {
      if (err) {
        return res.send(err);
      }
      res.json({
        message: "Usuario satisfactoriamente modificado",
        usuario
      });
    });
  });
});

export default UsuarioRouter;
