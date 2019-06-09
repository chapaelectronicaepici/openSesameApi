import mongoose from "mongoose";
import { Router } from "express";
import Course from "../models/Course";
import User from "../models/User";
import { checkToken } from "../middleware";

const CourseRouter = Router();

CourseRouter.get("/", checkToken, (req, res) => {
  const {
    decoded: {
      data: { role }
    }
  } = req;
  if (role !== "administrator") {
    return res.send({
      error: true,
      message: "Unauthorized user"
    });
  }
  Course.find({})
    .populate("user")
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.send(err);
    });
});

CourseRouter.post("/", checkToken, (req, res) => {
  const {
    decoded: {
      data: { role }
    }
  } = req;
  if (role !== "administrator") {
    return res.send({
      error: true,
      message: "Unauthorized user"
    });
  }
  var newCourse = new Course(req.body);
  newCourse.save((err, course) => {
    if (err) {
      return res.json({
        message: err,
        error: true
      });
    }
    res.json({
      data: course,
      error: false
    });
  });
});

CourseRouter.get("/:id", checkToken, (req, res) => {
  const {
    decoded: {
      data: { role }
    }
  } = req;
  if (role !== "administrator") {
    return res.send({
      error: true,
      message: "Unauthorized user"
    });
  }
  Course.findOne({ _id: req.params.id })
    .populate("user")
    .exec((err, course) => {
      if (err) {
        return res.send({
          message: err,
          error: true
        });
      }
      res.json({
        course,
        error: false
      });
    });
});

CourseRouter.delete("/:id", checkToken, (req, res) => {
  const {
    decoded: {
      data: { role }
    }
  } = req;
  if (role !== "administrator") {
    return res.send({
      error: true,
      message: "Unauthorized user"
    });
  }
  Course.remove({ _id: req.params.id }, (err, result) => {
    if (err) {
      return res.send(err);
    }
    res.json({
      result
    });
  });
});

CourseRouter.put("/:id", checkToken, (req, res) => {
  const {
    decoded: {
      data: { role }
    }
  } = req;
  if (role !== "administrator") {
    return res.send({
      error: true,
      message: "Unauthorized user"
    });
  }
  Course.findOneAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, course) => {
      if (err) {
        return res.send(err);
      }
      res.json({
        data: course,
        error: false
      });
    }
  );
});

export default CourseRouter;
