import mongoose from "mongoose";

const subitemSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    cantidad: { type: Number, required: true, min: 0 },
    unidad: { type: String, trim: true },
    observaciones: { type: String, trim: true },
  },
  { _id: false },
);

const solicitudMaterialSchema = new mongoose.Schema(
  {
    obra_id: { type: String, required: true },
    partida_rubro: {
      type: String,
      required: true,
      enum: [
        "trabajos_preliminares_y_gestion_verde",
        "infraestructura_y_fundaciones",
        "envolvente_sustentable",
        "aberturas_de_alta_prestacion",
        "instalaciones_bio_eficientes",
        "revestimientos_y_terminaciones",
        "limpieza_y_entrega",
      ],
    },
    subitems: {
      type: [subitemSchema],
      required: true,
      validate: {
        validator: (v) => v.length > 0,
        message: "Debe haber al menos 1 subitem en la solicitud",
      },
    },
    observaciones: { type: String, trim: true },
    estado: {
      type: String,
      enum: ["pendiente", "solicitado", "aprobado", "rechazado"],
      default: "pendiente",
    },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

const SolicitudMaterial = mongoose.model(
  "SolicitudMaterial",
  solicitudMaterialSchema,
);

export default SolicitudMaterial;
