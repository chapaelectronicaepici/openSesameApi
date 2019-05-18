import mongoose from "mongoose";
import Usuario from "./User";
import mongoosePaginate from "mongoose-paginate";
var usuarioSchema = Usuario.schema;

const Schema = mongoose.Schema;

let AlertSchema = new Schema(
  {
    descripcion: { type: String },
    ubicacionInicialLatitud: { type: String, required: true },
    ubicacionInicialLongitud: { type: String, required: true },
    usuario: { type: usuarioSchema, required: true },
    estado: { type: Boolean, default: true },
    creadoEn: { type: Date, default: new Date() }
  },
  {
    versionKey: false
  }
);

AlertSchema.plugin(mongoosePaginate);

export default mongoose.model("alert", AlertSchema);
