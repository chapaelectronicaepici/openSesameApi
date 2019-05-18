import mongoose from "mongoose";
const Schema = mongoose.Schema;

let UsuarioSchema = new Schema(
  {
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
    dni: { type: String, required: true },
    correo: { type: String, required: true },
    clave: { type: String },
    tipo: { type: String, required: true },
    estado: { type: Boolean, default: true },
    creadoEn: { type: Date, default: new Date() }
  },
  {
    versionKey: false
  }
);

export default mongoose.model("usuario", UsuarioSchema);
