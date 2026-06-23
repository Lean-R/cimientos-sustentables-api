import Gasto from "../models/gastos.model.js";

const GastosService = {
  getAll: async (filtros = {}) => {
    return await Gasto.find(filtros);
  },

  // Buscar un gasto por ID
  getById: async (id) => {
    return await Gasto.findById(id);
  },

  create: async (data) => {
    if (data.monto) data.monto = parseFloat(data.monto);
    return await Gasto.create(data);
  },

  update: async (id, data) => {
    if (data.monto) data.monto = parseFloat(data.monto);

    // { new: true } hace que Mongoose te devuelva el gasto ya modificado.
    // runValidators: true obliga a Mongo a chequear que los nuevos datos cumplan con el Schema.
    const gastoActualizado = await Gasto.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!gastoActualizado) {
      throw new Error("Gasto no encontrado");
    }

    return gastoActualizado;
  },

  delete: async (id) => {
    const resultado = await Gasto.findByIdAndDelete(id);
    return resultado !== null;
  },
};

export default GastosService;
