import mongoose from "mongoose";
import { Router } from "express";
import Alerta from "../models/Alerta";

const AlertaRouter = Router();

AlertaRouter.get("/", (req, res) => {
  let query = Alerta.find({});
  query.exec((err, alertas) => {
    if (err) {
      return res.send(err);
    }
    res.json(alertas);
  });
});

AlertaRouter.get("/activas", (req, res) => {
  let query = Alerta.find({ estado: true });
  query.exec((err, alertas) => {
    if (err) {
      return res.send({
        message: err,
        error: true
      });
    }
    res.json({
      message: "Alerta satisfactoriamente agregado",
      data: alertas,
      error: false
    });
  });
});

AlertaRouter.post("/", (req, res) => {
  var newAlerta = new Alerta(req.body);
  newAlerta.save((err, alerta) => {
    if (err) {
      return res.json({
        message: err,
        error: true
      });
    }
    res.json({
      message: "Alerta satisfactoriamente agregado",
      data: alerta,
      error: false
    });
  });
});

AlertaRouter.get("/:id", (req, res) => {
  Alerta.findById(req.params.id, (err, alerta) => {
    if (err) {
      return res.send({
        message: err,
        error: true
      });
    }
    res.json({
      message: "Alerta recuperada",
      data: alerta,
      error: false
    });
  });
});

AlertaRouter.get("/lastByUser/:idUsuario", (req, res) => {
  Alerta.findOne(
    {
      "usuario._id": req.params.idUsuario,
      estado: true
    },
    (err, alerta) => {
      if (err) {
        return res.send({
          message: err,
          error: true
        });
      }
      console.log("newAlerta: ", alerta);
      res.json({
        message: "Alerta recuperada",
        data: alerta,
        error: false
      });
    }
  );
});

AlertaRouter.put("/lastByUser/:idUsuario", (req, res) => {
  Alerta.findOneAndUpdate(
    {
      "usuario._id": req.params.idUsuario,
      estado: true
    },
    req.body,
    { new: true },
    (err, alerta) => {
      if (err) {
        return res.send({
          message: err,
          error: true
        });
      }
      res.json({
        message: "Alerta actualizada",
        data: alerta,
        error: false
      });
    }
  );
});

AlertaRouter.delete("/", (req, res) => {
  Alerta.remove({ _id: req.params.id }, (err, result) => {
    if (err) {
      return res.send(err);
    }
    res.json({
      message: "Alerta satisfactoriamente eliminado",
      result
    });
  });
});

AlertaRouter.put("/:id", (req, res) => {
  Alerta.findOneAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, alerta) => {
      if (err) {
        return res.send(err);
      }
      res.json({
        message: "Alerta satisfactoriamente modificado",
        data: alerta,
        error: false
      });
    }
  );
});

export default AlertaRouter;
