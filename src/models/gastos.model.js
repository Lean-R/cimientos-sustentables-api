import mongoose from "mongoose";

const gastoSchema = new mongoose.Schema(
  {
    obra_id: { type: String, required: true },
    partida_id: { type: String, required: true },
    fecha: { type: Date, default: Date.now },
    concepto: { type: String, required: true, trim: true },
    cantidad: { type: Number, required: true, min: 1 },
    unidad: {
      type: String,
      required: true,
      enum: ["unidades", "litros", "kilos", "metros", "m2", "m3"],
    },
    monto: { type: Number, default: 0, min: 0, required: true },
    estado: {
      type: String,
      enum: [
        "pendiente",
        "solicitado",
        "aprobado",
        "rechazado",
        "cancelado",
        "utilizado",
      ],
      default: "pendiente",
    },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

const Gasto = mongoose.model("Gasto", gastoSchema);

export default Gasto;
