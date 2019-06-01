import mongoose from "mongoose";
import { Router } from "express";
import Course from "../models/Course";

const CourseRouter = Router();

CourseRouter.get("/", (req, res) => {
  Course.paginate({}, { page, limit: 10 })
    .then(function(result) {
      res.json(result);
    })
    .catch(err => {
      res.send(err);
    });
});

CourseRouter.get("/activas", (req, res) => {
  let query = Course.find({ estado: true });
  query.exec((err, courses) => {
    if (err) {
      return res.send({
        message: err,
        error: true
      });
    }
    res.json({
      data: courses,
      error: false
    });
  });
});

CourseRouter.post("/", (req, res) => {
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

CourseRouter.get("/:id", (req, res) => {
  Course.findById(req.params.id, (err, course) => {
    if (err) {
      return res.send({
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

CourseRouter.delete("/:id", (req, res) => {
  Course.remove({ _id: req.params.id }, (err, result) => {
    if (err) {
      return res.send(err);
    }
    res.json({
      result
    });
  });
});

CourseRouter.put("/:id", (req, res) => {
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
