import mongoose from "mongoose";

const gastoSchema = new mongoose.Schema(
  {
    obra_id: { type: String, required: true },
    partida_id: { type: String, required: true }, //type: mongoose.Schema.Types.ObjectId, ref: "PartidaPresupuestaria", required: false },
    fecha: { type: Date, default: Date.now }, 
    concepto: { type: String, required: true, trim: true },
    cantidad: { type: Number, required: true, min: 1 },
    unidad: { type: String, required: true, enum: ["unidades", "litros", "kilos", "metros", "m2", "m3"] },
    monto: { type: Number, default: 0, min: 0, required: true},
    estado: { type: String, enum: ["pendiente", "solicitado", "aprobado", "rechazado", "cancelado", "utilizado"], default: "pendiente"}
  },
  { timestamps: true, toJSON: { virtuals: true } },

);


const Gasto = mongoose.model("Gasto", gastoSchema);

export default Gasto;


/*
import { readFile, writeFile } from "fs/promises"; // File System con soporte de Promesas (async/await).
import { resolve } from "path";

const filePath = resolve("src/data/gastos.json");

// Leer todos los gastos
export const findAll = async () => {
  try {
    const data = await readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // Si el archivo no existe, retornamos un array vacío
    return [];
  }
};

// Guardar todos los gastos
export const save = async (gastos) => {
  await writeFile(filePath, JSON.stringify(gastos, null, 2));
};

*/