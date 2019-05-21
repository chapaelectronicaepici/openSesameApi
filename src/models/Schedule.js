import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

const Schema = mongoose.Schema;

let ScheduleSchema = new Schema(
  {
    day: { type: Number },
    startTime: { type: Date, default: new Date() },
    endTime: { type: Date, default: new Date() },
    createAt: { type: Date, default: new Date() }
  },
  {
    versionKey: false
  }
);

ScheduleSchema.plugin(mongoosePaginate);
export default mongoose.model("schedule", ScheduleSchema);
