import mongoose from "mongoose";
import User from "./User";
import mongoosePaginate from "mongoose-paginate";
var userSchema = User.schema;

const Schema = mongoose.Schema;

let CourseSchema = new Schema(
  {
    name: { type: String },
    user: { type: userSchema, required: true },
    createAt: { type: Date, default: new Date() }
  },
  {
    versionKey: false
  }
);

CourseSchema.plugin(mongoosePaginate);
export default mongoose.model("course", CourseSchema);
