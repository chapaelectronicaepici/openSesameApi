import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";
const Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    dni: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    role: { type: String, required: true },
    createAt: { type: Date, default: new Date() }
  },
  {
    versionKey: false
  }
);

UserSchema.plugin(mongoosePaginate);

export default mongoose.model("user", UserSchema);
