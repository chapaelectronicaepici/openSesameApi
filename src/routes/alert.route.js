import mongoose from "mongoose";
import { Router } from "express";
import Alert from "../models/Alert";

const AlertRouter = Router();

AlertRouter.get("/", (req, res) => {
  let query = Alert.find({});
  query.exec((err, alerts) => {
    if (err) {
      return res.send(err);
    }
    res.json(alerts);
  });
});

AlertRouter.get("/activas", (req, res) => {
  let query = Alert.find({ estado: true });
  query.exec((err, alerts) => {
    if (err) {
      return res.send({
        message: err,
        error: true
      });
    }
    res.json({
      message: "Alert satisfactoriamente agregado",
      data: alerts,
      error: false
    });
  });
});

AlertRouter.post("/", (req, res) => {
  var newAlert = new Alert(req.body);
  newAlert.save((err, alert) => {
    if (err) {
      return res.json({
        message: err,
        error: true
      });
    }
    res.json({
      message: "Alert satisfactoriamente agregado",
      data: alert,
      error: false
    });
  });
});

AlertRouter.get("/:id", (req, res) => {
  Alert.findById(req.params.id, (err, alert) => {
    if (err) {
      return res.send({
        message: err,
        error: true
      });
    }
    res.json({
      message: "Alert recuperada",
      data: alert,
      error: false
    });
  });
});

AlertRouter.get("/lastByUser/:idUser", (req, res) => {
  Alert.findOne(
    {
      "user._id": req.params.idUser,
      estado: true
    },
    (err, alert) => {
      if (err) {
        return res.send({
          message: err,
          error: true
        });
      }
      console.log("newAlert: ", alert);
      res.json({
        message: "Alert recuperada",
        data: alert,
        error: false
      });
    }
  );
});

AlertRouter.put("/lastByUser/:idUser", (req, res) => {
  Alert.findOneAndUpdate(
    {
      "user._id": req.params.idUser,
      estado: true
    },
    req.body,
    { new: true },
    (err, alert) => {
      if (err) {
        return res.send({
          message: err,
          error: true
        });
      }
      res.json({
        message: "Alert actualizada",
        data: alert,
        error: false
      });
    }
  );
});

AlertRouter.delete("/", (req, res) => {
  Alert.remove({ _id: req.params.id }, (err, result) => {
    if (err) {
      return res.send(err);
    }
    res.json({
      message: "Alert satisfactoriamente eliminado",
      result
    });
  });
});

AlertRouter.put("/:id", (req, res) => {
  Alert.findOneAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, alert) => {
      if (err) {
        return res.send(err);
      }
      res.json({
        message: "Alert satisfactoriamente modificado",
        data: alert,
        error: false
      });
    }
  );
});

export default AlertRouter;
