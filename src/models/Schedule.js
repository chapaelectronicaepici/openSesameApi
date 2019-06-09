import mongoose from "mongoose";
const Schema = mongoose.Schema;
let ScheduleSchema = new Schema(
  {
    day: { type: Number, required: true },
    startTime: { type: Date, default: new Date(), required: true },
    endTime: { type: Date, default: new Date(), required: true },
    createAt: { type: Date, default: new Date() }
  },
  {
    versionKey: false
  }
);

export default mongoose.model("schedule", ScheduleSchema);
