import mongoose from "mongoose";
const Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    dni: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, select: false },
    role: { type: String, required: true },
    createAt: { type: Date, default: new Date() }
  },
  {
    versionKey: false
  }
);

export default mongoose.model("user", UserSchema);
