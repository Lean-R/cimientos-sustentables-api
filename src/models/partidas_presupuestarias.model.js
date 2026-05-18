import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    detalle: { type: String, required: true, trim: true },
    cantidad: { type: Number, required: true, min: 0.01 },
    unidad_medida: { type: String, required: true, trim: true },
    precio_unitario: { type: Number, required: true, min: 0.01 },
    // Campo denormalizado. Se calcula automaticamente
    precio_parcial: { type: Number },
  },
  // No necesita _id porque depende de la partida presupuestaria
  { _id: false },
);

const partidaPresupuestariaSchema = new mongoose.Schema(
  {
    obra_id: { type: String, required: true },
    rubro: {
      type: String,
      required: true,
      enum: [
        "materiales",
        "mano_de_obra",
        "electricidad",
        "aberturas",
        "sanitarios",
        "pintura",
        "herreria",
        "carpinteria",
        "plomeria",
        "gas",
        "aire_acondicionado",
        "otros",
      ],
    },
    items: {
      type: [itemSchema],
      required: true,
      validate: {
        validator: (v) => v.length > 0,
        message: "Debe haber al menos 1 item en la partida presupuestaria",
      },
    },
    precio_total: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    // virtuals true para que se incluyan en el JSON
    toJSON: { virtuals: true },
  },
);

// Creación del modelo
const PartidaPresupuestaria = mongoose.model(
  "PartidaPresupuestaria",
  partidaPresupuestariaSchema,
);

export default PartidaPresupuestaria;
