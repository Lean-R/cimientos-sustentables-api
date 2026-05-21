import mongoose from "mongoose";

const esquemaObras = new mongoose.Schema(
  {
    nombre: {type: String,required: true,trim: true,},
    direccion: {type: String,required: true,trim: true,},
    provincia: {type: String,required: true,trim: true,},
    director: {type: String,required: true,trim: true,},
    tipo_contratacion: {type: String,required: true,trim: true},
    estado: {type: String,required: true,trim: true,},
    presupuestoTotal: {type: Number,required: true,min: 0,},
    telefono: { type: String, trim: true }  
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Obra = mongoose.model("Obra", esquemaObras);

export default Obra;
