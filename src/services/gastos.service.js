import { findAll, save } from "../models/gastos.model.js";
import { randomUUID } from "crypto";

const GastosService = {
  getAll: async () => {
    return await findAll();
  },

  // Buscar un gasto por ID
  getById: async (id) => {
    const gastos = await findAll();
    return gastos.find((g) => g.id === id);
  },

  create: async (data) => {
    const gastos = await findAll();

    const nuevoGasto = {
      id: randomUUID(), // Generamos un ID único y seguro
      obra_id: data.obra_id,
      partida_id: data.partida_id,
      fecha: data.fecha || new Date().toISOString(),
      proveedor: data.proveedor || "N/D",
      concepto: data.concepto,
      monto: parseFloat(data.monto),
      estado: data.estado || "solicitado",
    };

    gastos.push(nuevoGasto);
    await save(gastos);
    return nuevoGasto;
  },

  delete: async (id) => {
    const gastos = await findAll();
    const filtrados = gastos.filter((g) => g.id !== id);

    if (gastos.length === filtrados.length) return false; // No encontró nada

    await save(filtrados);
    return true;
  },
};

export default GastosService;
