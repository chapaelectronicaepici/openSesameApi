import mongoose from "mongoose";
import Schedule from "./Schedule";
const ObjectId = mongoose.Schema.Types.ObjectId;

const Schema = mongoose.Schema;
let CourseSchema = new Schema(
  {
    name: { type: String },
    user: { type: ObjectId, required: true, ref: "user" },
    schedules: [{ type: Array, type: Schedule.schema }],
    createAt: { type: Date, default: new Date() }
  },
  {
    versionKey: false
  }
);

export default mongoose.model("course", CourseSchema);
